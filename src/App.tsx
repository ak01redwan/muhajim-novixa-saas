import { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Dropzone } from './components/Dropzone';
import { ControlsPanel, ResizeOptions } from './components/ControlsPanel';
import { ResultPreview } from './components/ResultPreview';
import { SeoSection } from './components/SeoSection';
import { Footer } from './components/Footer';
import { DEFAULT_LANGUAGE, LANGUAGES, Language } from './i18n/languages';
import { getTranslation } from './i18n/translations';
import { WorkerInputMessage, WorkerOutputMessage } from './workers/image.worker';
import { AlertCircle, X } from 'lucide-react';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    // Check URL query param ?lang=xx
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang');
      if (langParam) {
        const found = LANGUAGES.find((l) => l.code === langParam);
        if (found) return found;
      }
    }
    return DEFAULT_LANGUAGE;
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [resizeOptions, setResizeOptions] = useState<ResizeOptions>({
    mode: 'percentage',
    percentage: 50,
    width: 0,
    height: 0,
    lockAspect: true,
    format: 'image/webp',
    quality: 0.85,
    fitMode: 'cover',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [processedResult, setProcessedResult] = useState<{
    blob: Blob;
    width: number;
    height: number;
    dataUrl: string;
  } | null>(null);

  const workerRef = useRef<Worker | null>(null);

  const t = getTranslation(currentLang.code);

  // Initialize Web Worker
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('./workers/image.worker.ts', import.meta.url),
      { type: 'module' }
    );

    workerRef.current.onmessage = (e: MessageEvent<WorkerOutputMessage>) => {
      const { success, blob, width, height, error } = e.data;
      setIsProcessing(false);

      if (success && blob) {
        const dataUrl = URL.createObjectURL(blob);
        setProcessedResult({
          blob,
          width,
          height,
          dataUrl,
        });
      } else {
        setErrorMessage(error || 'Failed to process image. Please try another file.');
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // Update HTML dir & lang attributes and URL parameter when language changes
  useEffect(() => {
    document.documentElement.setAttribute('dir', currentLang.dir);
    document.documentElement.setAttribute('lang', currentLang.code);

    const url = new URL(window.location.href);
    if (currentLang.code === DEFAULT_LANGUAGE.code) {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', currentLang.code);
    }
    window.history.replaceState({}, '', url.toString());
  }, [currentLang]);

  // Handle image load to extract dimensions
  const handleFileSelected = (file: File) => {
    setErrorMessage(null);
    setSelectedFile(file);
    setProcessedResult(null);

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const w = img.width;
      const h = img.height;
      setOriginalWidth(w);
      setOriginalHeight(h);

      // Default resize option to 50%
      const defaultScaleW = Math.round(w * 0.5);
      const defaultScaleH = Math.round(h * 0.5);

      setResizeOptions((prev) => ({
        ...prev,
        width: defaultScaleW,
        height: defaultScaleH,
        percentage: 50,
      }));

      URL.revokeObjectURL(objectUrl);
    };

    img.onerror = () => {
      setErrorMessage('Failed to load image file. Please ensure it is a valid format.');
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };

  // Process Image via Web Worker
  const handleProcessImage = () => {
    if (!selectedFile || !workerRef.current || !resizeOptions.width || !resizeOptions.height) {
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);

    const message: WorkerInputMessage = {
      id: Math.random().toString(36).substring(2, 9),
      file: selectedFile,
      targetWidth: resizeOptions.width,
      targetHeight: resizeOptions.height,
      format: resizeOptions.format,
      quality: resizeOptions.quality,
      fitMode: resizeOptions.fitMode,
    };

    workerRef.current.postMessage(message);
  };

  const handleReset = () => {
    if (processedResult?.dataUrl) {
      URL.revokeObjectURL(processedResult.dataUrl);
    }
    setSelectedFile(null);
    setProcessedResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      
      {/* Top Header Navigation */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        t={t}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Hero Section */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
            <span>✨ 100% In-Browser In-Memory Engine ($0 Compute)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-100 leading-tight">
            {t.tagline}
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            {t.privacySubtitle}
          </p>
        </div>

        {/* In-App Error Notification Banner */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-sm flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-rose-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 1: Dropzone (if no file chosen) */}
        {!selectedFile && (
          <Dropzone onFileSelected={handleFileSelected} t={t} />
        )}

        {/* Step 2: Controls & Processing (if file chosen & not processed yet) */}
        {selectedFile && !processedResult && (
          <div className="space-y-6">
            
            {/* File Selected Badge */}
            <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400 font-bold text-xs">
                  IMG
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-200 truncate max-w-xs sm:max-w-md">
                    {selectedFile.name}
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {originalWidth} × {originalHeight} px
                  </div>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800/40 font-semibold"
              >
                Change Image
              </button>
            </div>

            <ControlsPanel
              originalWidth={originalWidth}
              originalHeight={originalHeight}
              options={resizeOptions}
              onChangeOptions={setResizeOptions}
              onProcess={handleProcessImage}
              isProcessing={isProcessing}
              t={t}
            />

          </div>
        )}

        {/* Step 3: Result Preview & Download */}
        {selectedFile && processedResult && (
          <ResultPreview
            originalFile={selectedFile}
            originalWidth={originalWidth}
            originalHeight={originalHeight}
            processedBlob={processedResult.blob}
            processedWidth={processedResult.width}
            processedHeight={processedResult.height}
            processedDataUrl={processedResult.dataUrl}
            onReset={handleReset}
            t={t}
          />
        )}

        {/* Programmatic SEO & Format Guide Section */}
        <SeoSection t={t} />

      </main>

      {/* Sticky Bottom Ad Slot Placeholder (Core Web Vitals Optimized) */}
      <div className="sticky bottom-0 z-40 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 py-2.5 px-4 text-center">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-slate-400">
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-600">Advertisement</span>
          <span className="font-semibold text-slate-300">⚡ Upgrade your digital presence with Novixa Solutions</span>
          <a href="https://novixa-cyan.vercel.app/ar" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-bold">
            Learn More ➔
          </a>
        </div>
      </div>

      {/* Footer */}
      <Footer currentLang={currentLang} onSelectLang={setCurrentLang} t={t} />

    </div>
  );
}

export default App;
