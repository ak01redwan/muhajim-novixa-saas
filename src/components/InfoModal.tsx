import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export type ModalType = 'privacy' | 'terms' | 'security' | null;

interface InfoModalProps {
  type: ModalType;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            {type === 'privacy' && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
            {type === 'terms' && <FileText className="w-6 h-6 text-cyan-400" />}
            {type === 'security' && <Lock className="w-6 h-6 text-indigo-400" />}
            <h3 className="text-xl font-bold text-slate-100">
              {type === 'privacy' && 'سياسة الخصوصية وأمان البيانات'}
              {type === 'terms' && 'شروط الاستخدام والخدمة'}
              {type === 'security' && 'الورقة البيضاء للأمان الرقمي (Security Whitepaper)'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content based on type */}
        <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
          {type === 'privacy' && (
            <>
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>ضمان Novixa: صورك لا تغادر متصفحك أو جهازك نهائياً ولا يتم إرسالها إلى أي خادم خارجي.</span>
              </div>
              <h4 className="font-bold text-slate-100 text-base">1. جمع البيانات</h4>
              <p>نحن لا نجمع أو نخزن أو ننقل أي صورة أو ملف يتم رفعه على منصة مُحجِّم (Muhajim). جميع عمليات المعالجة والتحجيم تتم محلياً داخل ذاكرة المتصفح عبر Web Workers.</p>
              <h4 className="font-bold text-slate-100 text-base">2. تحليلات التصفح والإعلانات</h4>
              <p>قد يستخدم الموقع أدوات تحليلات عامة أو شبكات إعلانية غير متطفلة لتحسين تجربة المستخدم وعرض إعلانات ملائمة دون ربطها بأي ملفات صورية للمستخدمين.</p>
              <h4 className="font-bold text-slate-100 text-base">3. ملفات تعريف الارتباط</h4>
              <p>نستخدم التخزين المحلي فقط لتذكر تفضيلاتك مثل اللغة المختارة والوضع الليلي.</p>
            </>
          )}

          {type === 'terms' && (
            <>
              <h4 className="font-bold text-slate-100 text-base">1. الاستخدام المجاني</h4>
              <p>تطبيق مُحجِّم متاح للاستخدام الشخصي والتجاري مجاناً 100% دون أي رسوم أو قيود على عدد الصور المسموح بتعديلها.</p>
              <h4 className="font-bold text-slate-100 text-base">2. حقوق الملكية الفكرية</h4>
              <p>منصة مُحجِّم (Muhajim) هي علامة تجارية وأداة مملوكة ومطورة بواسطة شركة Novixa Digital Engineering. تحتفظ الشركة بكافة حقوق التصميم والكود المصدري.</p>
              <h4 className="font-bold text-slate-100 text-base">3. إخلاء المسؤولية</h4>
              <p>يتم توفير الخدمة "كما هي" دون أي ضمانات صريحة أو ضمنية. نحن نسعى دائماً لتقديم أعلى جودة ضغط وتحجيم ممكنة لأجهزتكم.</p>
            </>
          )}

          {type === 'security' && (
            <>
              <h4 className="font-bold text-slate-100 text-base">المعمارية الهندسية للأمان (Zero-Compute Client Architecture)</h4>
              <p>تم تصميم منصة مُحجِّم من الأساس بهندسة أمان صفرية، حيث تعتمد على تقنيات HTML5 المتطورة:</p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong className="text-slate-200">HTML5 Canvas & OffscreenCanvas:</strong> تتم جميع عمليات التكبير والتصغير على معالج الرسوميات المحلي لجهازك.</li>
                <li><strong className="text-slate-200">Web Workers:</strong> عزل مهام معالجة الصور في مسار منفصل لضمان استقرار وسرعة المتصفح ومنع تجميد الشاشة.</li>
                <li><strong className="text-slate-200">EXIF Auto-Orientation:</strong> تصحيح زوايا الصور دون حفظ أي بيانات موقع جغرافي (GPS) مصاحبة للصورة لضمان سريتك.</li>
                <li><strong className="text-slate-200">Memory Cleanup:</strong> تفريغ ذاكرة الرام واستدعاء `URL.revokeObjectURL` فور الانتهاء لتجنب أي تسريب للذاكرة.</li>
              </ul>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 text-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
