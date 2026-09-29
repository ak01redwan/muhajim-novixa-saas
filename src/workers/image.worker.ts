// Web Worker for 100% In-Browser Image Scaling & Compression

export interface WorkerInputMessage {
  id: string;
  file: File;
  targetWidth: number;
  targetHeight: number;
  format: 'image/webp' | 'image/jpeg' | 'image/png';
  quality: number; // 0.1 to 1.0
  fitMode?: 'stretch' | 'contain' | 'cover';
  backgroundColor?: string;
}

export interface WorkerOutputMessage {
  id: string;
  success: boolean;
  blob?: Blob;
  dataUrl?: string;
  originalSize: number;
  newSize: number;
  width: number;
  height: number;
  error?: string;
}

self.onmessage = async (e: MessageEvent<WorkerInputMessage>) => {
  const { id, file, targetWidth, targetHeight, format, quality, fitMode = 'stretch', backgroundColor = '#FFFFFF' } = e.data;

  try {
    const originalSize = file.size;
    let imageBitmap: ImageBitmap;

    // Use EXIF orientation if supported by browser
    try {
      imageBitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
      imageBitmap = await createImageBitmap(file);
    }

    const canvas = new OffscreenCanvas(targetWidth, targetHeight);
    const ctx = canvas.getContext('2d', { alpha: format !== 'image/jpeg' });

    if (!ctx) {
      throw new Error('Failed to obtain 2D rendering context for OffscreenCanvas');
    }

    // High quality scaling settings
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (format === 'image/jpeg' || (fitMode === 'contain' && backgroundColor)) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }

    const srcW = imageBitmap.width;
    const srcH = imageBitmap.height;

    if (fitMode === 'cover') {
      // Scale and center crop
      const scale = Math.max(targetWidth / srcW, targetHeight / srcH);
      const renderW = srcW * scale;
      const renderH = srcH * scale;
      const offsetX = (targetWidth - renderW) / 2;
      const offsetY = (targetHeight - renderH) / 2;
      ctx.drawImage(imageBitmap, offsetX, offsetY, renderW, renderH);
    } else if (fitMode === 'contain') {
      // Scale and letterbox inside canvas
      const scale = Math.min(targetWidth / srcW, targetHeight / srcH);
      const renderW = srcW * scale;
      const renderH = srcH * scale;
      const offsetX = (targetWidth - renderW) / 2;
      const offsetY = (targetHeight - renderH) / 2;
      ctx.drawImage(imageBitmap, offsetX, offsetY, renderW, renderH);
    } else {
      // Direct stretch
      ctx.drawImage(imageBitmap, 0, 0, targetWidth, targetHeight);
    }

    imageBitmap.close();

    const blob = await canvas.convertToBlob({
      type: format,
      quality: quality,
    });

    const newSize = blob.size;

    self.postMessage({
      id,
      success: true,
      blob,
      originalSize,
      newSize,
      width: targetWidth,
      height: targetHeight,
    } as WorkerOutputMessage);

  } catch (err: any) {
    self.postMessage({
      id,
      success: false,
      originalSize: file.size,
      newSize: 0,
      width: 0,
      height: 0,
      error: err.message || 'Unknown processing error',
    } as WorkerOutputMessage);
  }
};
