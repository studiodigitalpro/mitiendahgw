import React from 'react';
import { ShieldCheck, Globe, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

export const CompanyCertifications: React.FC = () => {
  return (
    <section id="certificaciones-section" className="my-12 p-6 sm:p-10 rounded-3xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-8">
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          Respaldo y Calidad Global
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Certificaciones Internacionales & Sellos de Calidad
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
          Todos los productos de Health Green World cuentan con rigurosos estándares sanitarios internacionales que avalan su pureza, inocuidad y eficacia nutracéutica.
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {COMPANY_INFO.certifications.map((cert, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-2.5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-16 w-full flex items-center justify-center overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-900/50 p-1">
              <img
                src={cert.image}
                alt={cert.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{cert.name}</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">{cert.desc}</p>
          </div>
        ))}
      </div>

      {/* Direct Sales Associations */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 text-center">
          Miembro de Asociaciones Internacionales de Venta Directa:
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {COMPANY_INFO.associations.map((assoc, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{assoc.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
