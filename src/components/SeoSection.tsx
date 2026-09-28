import React from 'react';
import { Cpu, ShieldCheck, Zap, Globe, Layers } from 'lucide-react';
import { TranslationKeys } from '../i18n/translations';

interface SeoSectionProps {
  t: TranslationKeys;
}

export const SeoSection: React.FC<SeoSectionProps> = ({ t }) => {
  return (
    <section className="mt-16 glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800/80 space-y-8">
      
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Globe className="w-3.5 h-3.5" />
          <span>Programmatic i18n SEO Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 leading-tight">
          {t.seoTitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Feature 1 */}
        <div className="glass-card p-6 rounded-2xl space-y-3 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-200">100% In-Browser Engine</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t.seoParagraph1}
          </p>
        </div>

        {/* Feature 2 */}
        <div className="glass-card p-6 rounded-2xl space-y-3 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-950 flex items-center justify-center text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-200">Social & Store Presets</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t.seoParagraph2}
          </p>
        </div>

        {/* Feature 3 */}
        <div className="glass-card p-6 rounded-2xl space-y-3 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-200">Absolute Privacy & Speed</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t.seoParagraph3}
          </p>
        </div>

      </div>

      {/* Structured Comparison Table for WebP vs JPG vs PNG */}
      <div className="pt-6 border-t border-slate-800/80">
        <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>Format Comparison Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start text-slate-400">
            <thead className="bg-slate-900/80 text-slate-200 font-bold uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Format</th>
                <th className="px-4 py-3">Compression</th>
                <th className="px-4 py-3">Transparency</th>
                <th className="px-4 py-3">Best Used For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr className="hover:bg-slate-900/40">
                <td className="px-4 py-3 font-bold text-cyan-400">WEBP</td>
                <td className="px-4 py-3 text-emerald-400">Ultra High (-80%)</td>
                <td className="px-4 py-3 text-emerald-400">Yes</td>
                <td className="px-4 py-3 text-slate-300">Websites, E-Commerce, Modern Apps</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="px-4 py-3 font-bold text-amber-400">JPEG / JPG</td>
                <td className="px-4 py-3 text-emerald-400">High (-60%)</td>
                <td className="px-4 py-3 text-rose-400">No</td>
                <td className="px-4 py-3 text-slate-300">Photographs, Social Media Posts</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="px-4 py-3 font-bold text-indigo-400">PNG</td>
                <td className="px-4 py-3 text-amber-400">Lossless (-20%)</td>
                <td className="px-4 py-3 text-emerald-400">Yes</td>
                <td className="px-4 py-3 text-slate-300">Logos, Graphics, Transparent Icons</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
};
