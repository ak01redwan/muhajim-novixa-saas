import React from 'react';
import { Download, RefreshCw, Sparkles, ExternalLink, HardDrive } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TranslationKeys } from '../i18n/translations';

interface ResultPreviewProps {
  originalFile: File;
  originalWidth: number;
  originalHeight: number;
  processedBlob: Blob;
  processedWidth: number;
  processedHeight: number;
  processedDataUrl: string;
  onReset: () => void;
  t: TranslationKeys;
}

export const ResultPreview: React.FC<ResultPreviewProps> = ({
  originalFile,
  originalWidth,
  originalHeight,
  processedBlob,
  processedWidth,
  processedHeight,
  processedDataUrl,
  onReset,
  t,
}) => {
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const originalSizeFormatted = formatBytes(originalFile.size);
  const newSizeFormatted = formatBytes(processedBlob.size);

  const savingsPercent = Math.max(
    0,
    Math.round(((originalFile.size - processedBlob.size) / originalFile.size) * 100)
  );

  const handleDownload = () => {
    // Trigger confetti celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    const extension = processedBlob.type.split('/')[1] || 'png';
    const link = document.createElement('a');
    link.href = processedDataUrl;
    link.download = `resized_${originalFile.name.split('.')[0]}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* File Size Comparison Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30 bg-cyan-950/20 text-center space-y-4">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-900/40 border border-cyan-700/50 text-cyan-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{t.savingsLabel}: {savingsPercent}%</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center max-w-xl mx-auto">
          
          {/* Before */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 font-semibold mb-1">{t.originalSize}</div>
            <div className="text-xl font-bold font-mono text-slate-200">{originalSizeFormatted}</div>
            <div className="text-[11px] font-mono text-slate-500">{originalWidth} × {originalHeight} px</div>
          </div>

          {/* After */}
          <div className="bg-cyan-950/60 p-4 rounded-2xl border border-cyan-800/60">
            <div className="text-xs text-cyan-300 font-semibold mb-1">{t.newSize}</div>
            <div className="text-xl font-bold font-mono text-cyan-400">{newSizeFormatted}</div>
            <div className="text-[11px] font-mono text-cyan-300">{processedWidth} × {processedHeight} px</div>
          </div>

        </div>

        {/* Download & Reset Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <button
            onClick={handleDownload}
            className="flex-1 gradient-button py-4 px-6 rounded-2xl font-bold text-slate-950 text-base flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20"
          >
            <Download className="w-5 h-5" />
            <span>{t.downloadBtn}</span>
          </button>

          <button
            onClick={onReset}
            className="py-4 px-6 rounded-2xl font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-sm flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-slate-400" />
            <span>{t.resetBtn}</span>
          </button>
        </div>

      </div>

      {/* Image Preview Container */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 border border-slate-800 flex flex-col items-center">
        <div className="w-full max-h-[450px] overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2">
          <img
            src={processedDataUrl}
            alt="Resized Preview"
            className="max-h-[430px] w-auto object-contain rounded-xl shadow-2xl"
          />
        </div>
      </div>

      {/* Monetization & Novixa Ecosystem Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Affiliate Link */}
        <a
          href="https://canva.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card rounded-2xl p-4 flex items-center gap-3 border border-slate-800 hover:border-cyan-500/40"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/50 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex-1 text-xs">
            <div className="font-bold text-slate-200">{t.canvaAffiliate}</div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
              <span>Try Canva Pro</span>
              <ExternalLink className="w-3 h-3 text-purple-400" />
            </div>
          </div>
        </a>

        {/* Novixa Enterprise Funnel */}
        <a
          href="https://novixa-cyan.vercel.app/ar"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card rounded-2xl p-4 flex items-center gap-3 border border-slate-800 hover:border-cyan-500/40"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center shrink-0">
            <HardDrive className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex-1 text-xs">
            <div className="font-bold text-slate-200">{t.novixaDevLink}</div>
            <div className="text-[10px] text-cyan-400 flex items-center gap-1 mt-0.5">
              <span>Contact Novixa Team</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </a>

      </div>

    </div>
  );
};
