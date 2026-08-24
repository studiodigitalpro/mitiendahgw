import React from 'react';
import { Sparkles, CheckCircle2, TrendingUp, Award, ShoppingBag } from 'lucide-react';

interface BVProgressBarProps {
  currentBV: number;
  onOpenMemberships: () => void;
  onOpenCart?: () => void;
}

export const BVProgressBar: React.FC<BVProgressBarProps> = ({
  currentBV,
  onOpenMemberships
}) => {
  const isPartnerUnlocked = currentBV >= 50;
  const nextTarget = currentBV < 50 ? 50 : currentBV < 100 ? 100 : currentBV < 300 ? 300 : 600;
  const progressPercent = Math.min(100, Math.round((currentBV / 600) * 100));
  const bvNeededForPartner = Math.max(0, Number((50 - currentBV).toFixed(1)));

  return (
    <div id="bv-progress-bar" className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-4 sm:p-6 shadow-xl border border-emerald-500/20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Puntaje de Negocio HGW (BV)
              </span>
              {isPartnerUnlocked && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 shadow-sm animate-pulse">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  30% DESCUENTO SOCIO ACTIVO
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
              Tu Carrito Acumula:{' '}
              <span className="text-emerald-400 underline decoration-emerald-500 underline-offset-4">
                {currentBV.toFixed(1)} BV
              </span>
            </h3>

            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              {!isPartnerUnlocked ? (
                <span>
                  Te faltan solo <strong className="text-emerald-400 font-semibold">{bvNeededForPartner} BV</strong> para desbloquear automáticamente el{' '}
                  <strong className="text-white font-semibold">30% de Descuento de Socio Mayorista</strong> en todos tus productos.
                </span>
              ) : (
                <span>
                  🎉 <strong>¡Descuento de Socio Desbloqueado!</strong> Estás ahorrando un 30% en tu orden y calificas para activar tu membresía oficial HGW.
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="btn-ver-membresias-bar"
              onClick={onOpenMemberships}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all duration-200 shadow-md hover:shadow-emerald-500/25 flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              Ver Membresías HGW
            </button>
          </div>
        </div>

        {/* Progress Tracker Milestones */}
        <div className="space-y-2 mt-4">
          <div className="w-full bg-slate-800/80 rounded-full h-3.5 p-0.5 border border-slate-700 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full transition-all duration-500 shadow-inner"
              style={{ width: `${Math.max(4, Math.min(100, (currentBV / 600) * 100))}%` }}
            />
          </div>

          {/* Milestones markers */}
          <div className="grid grid-cols-4 text-center text-xs font-medium pt-1 gap-1">
            <div className={`p-1.5 rounded-lg border transition-colors ${currentBV >= 50 ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 font-bold' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
              <div className="text-[11px] sm:text-xs">Prejunior</div>
              <div className="text-white font-bold">50 BV</div>
              <div className="text-[10px] text-emerald-400">-30% Desc.</div>
            </div>

            <div className={`p-1.5 rounded-lg border transition-colors ${currentBV >= 100 ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 font-bold' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
              <div className="text-[11px] sm:text-xs">Junior</div>
              <div className="text-white font-bold">100 BV</div>
              <div className="text-[10px] text-emerald-400">7% Bono Eq.</div>
            </div>

            <div className={`p-1.5 rounded-lg border transition-colors ${currentBV >= 300 ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 font-bold' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
              <div className="text-[11px] sm:text-xs">Senior</div>
              <div className="text-white font-bold">300 BV</div>
              <div className="text-[10px] text-emerald-400">Bono Élite</div>
            </div>

            <div className={`p-1.5 rounded-lg border transition-colors ${currentBV >= 600 ? 'bg-amber-950/80 border-amber-500/50 text-amber-300 font-bold' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
              <div className="text-[11px] sm:text-xs">👑 Master</div>
              <div className="text-white font-bold">600 BV</div>
              <div className="text-[10px] text-amber-400">60% Recompra</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
