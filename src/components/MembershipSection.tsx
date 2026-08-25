import React, { useState } from 'react';
import { Award, CheckCircle2, ShieldCheck, Sparkles, TrendingUp, Users, DollarSign, Zap, ChevronRight, HelpCircle } from 'lucide-react';
import { MEMBERSHIP_PLANS, HGW_RANKS } from '../data/memberships';
import { MembershipPlan } from '../types';

interface MembershipSectionProps {
  onSelectPlan: (plan: MembershipPlan) => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({ onSelectPlan }) => {
  const [activeTab, setActiveTab] = useState<'planes' | 'bonos' | 'rangos'>('planes');

  return (
    <section id="membresias-hgw-section" className="py-12 sm:py-16 bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/20 shadow-2xl relative overflow-hidden my-8">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Oportunidad de Negocio & Ganancia Mutua
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Membresías y Plan de Compensación <span className="text-emerald-400">HGW</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Actívate con productos de tu libre elección. Al comprar un mínimo de <strong>50 BV</strong>, obtienes el <strong>30% de descuento de socio</strong> en activación y recompras, acceso al revolucionario <strong>Plan de Ganancia Mutua 50/50</strong> y capacitación continua 24/7 en la Academia Digital.
          </p>

          {/* Sub Navigation */}
          <div className="flex justify-center pt-3">
            <div className="flex flex-wrap items-center justify-center p-1 bg-slate-800/90 rounded-2xl border border-slate-700 gap-1">
              <button
                id="tab-btn-planes"
                onClick={() => setActiveTab('planes')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'planes'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                1. Paquetes
              </button>
              <button
                id="tab-btn-bonos"
                onClick={() => setActiveTab('bonos')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'bonos'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                2. Los 7 Bonos
              </button>
              <button
                id="tab-btn-rangos"
                onClick={() => setActiveTab('rangos')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'rangos'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                3. Rangos de Honor
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Membership Plans */}
        {activeTab === 'planes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MEMBERSHIP_PLANS.map((plan) => {
              const isMaster = plan.id === 'master';
              const isJunior = plan.id === 'junior';

              return (
                <div
                  key={plan.id}
                  id={`membership-card-${plan.id}`}
                  className={`rounded-2xl flex flex-col justify-between p-6 transition-all duration-300 relative border ${
                    isMaster
                      ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/50 shadow-xl shadow-amber-500/10'
                      : isJunior
                      ? 'bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/40 shadow-lg'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {/* Popular/Top badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                        isMaster ? 'bg-amber-400 text-amber-950' : 'bg-emerald-400 text-emerald-950'
                      }`}>
                        {isMaster ? '👑 Máximo Nivel' : '⭐ Más Popular'}
                      </span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          {plan.bvRequired} BV en Productos
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-white mt-1">{plan.name}</h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{plan.recommendedFor}</p>
                    </div>

                    {/* Pricing Box */}
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                      <div className="text-[11px] text-slate-400">Inversión Aproximada:</div>
                      <div className="text-xl font-extrabold text-white text-emerald-300">
                        {plan.approxInvestment}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Productos de tu elección libre
                      </div>
                    </div>

                    {/* Key Perks */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                        Beneficios Principales:
                      </div>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {plan.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isMaster ? 'text-amber-400' : 'text-emerald-400'}`} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bonus Summary Pill */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Bono de Equipo:</span>
                        <strong className="text-emerald-400">{plan.bonuses.equipo.split(' ')[0]}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Tope Diario:</span>
                        <strong className="text-white">{plan.bonuses.topeDiario.split(' ')[0]} {plan.bonuses.topeDiario.split(' ')[1]}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Descuento Recompra:</span>
                        <strong className={isMaster ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                          {plan.discountRecompra}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* CTA button: opens Registration Modal with video tutorial */}
                  <div className="pt-6">
                    <button
                      id={`btn-elegir-membresia-${plan.id}`}
                      onClick={() => onSelectPlan(plan)}
                      className={`w-full py-3 px-4 rounded-xl font-extrabold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${
                        isMaster
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 shadow-amber-500/20'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                      }`}
                    >
                      <span>Elegir Membresía</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: The 7/8 Compensation Bonuses */}
        {activeTab === 'bonos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-base">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Bono de Venta al Público (30% a 60%)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Obtén del 30% hasta el 60% de margen de ganancia cuando tus clientes registrados compran productos hasta 100 BV en cada orden.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-base">
                2
              </div>
              <h3 className="text-lg font-bold text-white">Bono de Inicio Rápido (20%)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hasta 2 niveles con frontalidad directa ilimitada. Aplica el sistema de Ganancia Mutua 50/50 con tu línea de patrocinio.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-base">
                3
              </div>
              <h3 className="text-lg font-bold text-white">Bono de Desarrollo ($0.20 a $3.00 USD)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Paga hasta 10 niveles de profundidad por cada nuevo miembro en tu organización: Prejunior $0.20, Junior $0.50, Senior $1.50 y Master $3.00 USD.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-base">
                4
              </div>
              <h3 className="text-lg font-bold text-white">Bono de Equipo (5% al 10%)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Niveles infinitos. Se calcula en base al BV de tu equipo y del equipo de tu patrocinador (BV menor). Topes diarios de $50 hasta $720 USD/día.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-base">
                5
              </div>
              <h3 className="text-lg font-bold text-white">Bono de Recompra (5% en Matriz 2x2)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ganas de los BV de tus afiliados hasta 10 niveles. Además recibes 2.5% de la red de tu patrocinador que esté posicionada después de ti. Reconsumo mensual de solo 10 BV (~$20 USD).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-base">
                6
              </div>
              <h3 className="text-lg font-bold text-white">Bono Élite (4% de Liderazgo)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculado sobre el Bono de Equipo generado por tu red: hasta 3 generaciones para miembros Senior y hasta 6 generaciones completas para Socios Master.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3 md:col-span-2 lg:col-span-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                    <Award className="w-4 h-4" />
                    7. Bono al Mérito Personal & Ganancia Mutua 50/50
                  </div>
                  <h4 className="text-base font-extrabold text-white mt-1">
                    En HGW nadie se queda atrás: ganas de tu red y de la red de tu patrocinador
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                    Las ganancias se distribuyen 50% para ti y 50% para tu línea, creando un verdadero trabajo colaborativo donde todos crecen juntos.
                  </p>
                </div>

                <button
                  onClick={() => onSelectPlan(MEMBERSHIP_PLANS[3])}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
                >
                  Afiliarme como Master
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Ranks & Leadership Progression */}
        {activeTab === 'rangos' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {HGW_RANKS.map((rank, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-slate-900 p-2 flex items-center justify-center border border-slate-600">
                    <img
                      src={rank.badgeImage}
                      alt={rank.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h4 className="font-extrabold text-white text-sm">{rank.name}</h4>
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {rank.accumulated}
                  </span>
                  <p className="text-[11px] text-slate-400 leading-tight">{rank.description}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <strong className="text-white font-bold block text-sm">¿Cómo llegar a Rango Plata?</strong>
                <span className="text-slate-300">
                  Opción 1: 8 paquetes Master y 2 Junior (4 directos y 4 en segundo nivel Master) | Opción 2: 16 Senior y 2 Junior | Opción 3: 50 Junior.
                </span>
              </div>
              <button
                onClick={() => onSelectPlan(MEMBERSHIP_PLANS[0])}
                className="px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold whitespace-nowrap"
              >
                Comenzar mi Carrera
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
