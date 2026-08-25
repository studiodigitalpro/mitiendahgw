import React, { useState } from 'react';
import { Eye, ShieldCheck, HeartPulse, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';
import { Product } from '../types';

interface HealthProtocolsSectionProps {
  onSelectHealthFocus: (focus: string) => void;
}

export const HealthProtocolsSection: React.FC<HealthProtocolsSectionProps> = ({
  onSelectHealthFocus
}) => {
  const [activeProtocol, setActiveProtocol] = useState(0);

  const icons = [
    <Eye className="w-5 h-5 text-emerald-500" />,
    <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    <HeartPulse className="w-5 h-5 text-emerald-500" />,
    <Zap className="w-5 h-5 text-emerald-500" />
  ];

  return (
    <section id="protocolos-salud-section" className="my-12 space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Nutrición Celular y Bienestar HGW
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Líneas de Salud & Nutrición Celular
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
          Nutrientes, antioxidantes y fitocomplejos formulados con biotecnología I+D para apoyar tu vitalidad y desintoxicación natural.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COMPANY_INFO.healthProtocols.map((proto, idx) => (
          <div
            key={idx}
            onClick={() => {
              setActiveProtocol(idx);
              onSelectHealthFocus(proto.title);
            }}
            className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 ${
              activeProtocol === idx
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/50">
                  {icons[idx]}
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700">
                  {proto.badge}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{proto.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{proto.summary}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span>Ver Productos ({proto.productsRecommended.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
