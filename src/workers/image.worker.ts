// Web Worker for 100% In-Browser Image Scaling & Compression

export interface WorkerInputMessage {
  id: string;
  file: File;
  targetWidth: number;
  targetHeight: number;
  format: 'image/webp' | 'image/jpeg' | 'image/png';
  quality: number; // 0.1 to 1.0
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
  const { id, file, targetWidth, targetHeight, format, quality } = e.data;

  try {
    const originalSize = file.size;
    const imageBitmap = await createImageBitmap(file);

    const canvas = new OffscreenCanvas(targetWidth, targetHeight);
    const ctx = canvas.getContext('2d', { alpha: format !== 'image/jpeg' });

    if (!ctx) {
      throw new Error('Failed to obtain 2D rendering context for OffscreenCanvas');
    }

    // High quality scaling settings
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (format === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }

    ctx.drawImage(imageBitmap, 0, 0, targetWidth, targetHeight);
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
