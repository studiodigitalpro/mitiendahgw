import React from 'react';
import { Award, GraduationCap, Globe, Users, ExternalLink, ShieldCheck, Mail, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';
import { SPONSOR_INFO } from '../data/memberships';

interface LeadershipSectionProps {
  onOpenRegisterModal: () => void;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ onOpenRegisterModal }) => {
  return (
    <section id="liderazgo-section" className="my-12 space-y-8">
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          Liderazgo y Fundadores HGW
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Científicos, Ejecutivos & Equipo Panamá
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
          Respaldo corporativo de Green World International Group con más de 31 años de investigación científica en nutrición celular.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COMPANY_INFO.leadership.map((leader, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{leader.name}</h3>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    {leader.title}
                  </span>
                  {leader.code && (
                    <span className="inline-block text-[11px] font-mono font-bold px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded mt-1 border border-emerald-500/20">
                      Código: {leader.code}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {leader.bio}
              </p>
            </div>

            {leader.code ? (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={onOpenRegisterModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span>Registrarme con {leader.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
                <GraduationCap className="w-4 h-4 text-emerald-500" />
                <span>Liderazgo Ejecutivo Global</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
