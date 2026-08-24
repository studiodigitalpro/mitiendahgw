import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Globe2, 
  Coins, 
  Building2, 
  Calculator,
  Gift
} from 'lucide-react';
import { SPONSOR_INFO, MEMBERSHIP_PLANS } from '../data/memberships';

interface BusinessSectionProps {
  onOpenRegisterModal: () => void;
}

export const BusinessSection: React.FC<BusinessSectionProps> = ({ onOpenRegisterModal }) => {
  // Simulator State
  const [directClients, setDirectClients] = useState<number>(8);
  const [directPartners, setDirectPartners] = useState<number>(4);
  const [selectedPackage, setSelectedPackage] = useState<'prejunior' | 'junior' | 'senior' | 'master'>('master');

  // Profit Calculations
  // Average profit per client sale is ~$8 - $12
  const retailProfit = directClients * 12;
  // Fast start & team bonuses scale with package and partners
  const packageBonusFactor = selectedPackage === 'master' ? 1.0 : selectedPackage === 'senior' ? 0.8 : selectedPackage === 'junior' ? 0.6 : 0.4;
  const networkBonus = Math.round(directPartners * 45 * packageBonusFactor);
  const estimatedMonthlyIncome = retailProfit + networkBonus + Math.round(directPartners * directClients * 2.5);

  return (
    <section id="negocio-hgw-section" className="my-14 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 text-xs font-black uppercase tracking-wider shadow-xs">
          <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Oportunidad de Negocio & Emprendimiento
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Emprende con el Modelo de <span className="text-emerald-600 dark:text-emerald-400">Ganancia Mutua 50/50</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Descubre cómo generar ingresos inteligentes distribuyendo productos biotecnológicos de alta rotación y construyendo un equipo respaldado por <strong>Green World Group</strong> en más de 69 países.
        </p>
      </div>

      {/* 4 Pillars of HGW Business Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-emerald-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            Plan Mutuo Patentado (50/50)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Unico en la industria: ganas el 50% de las comisiones de tu línea descendente ¡y también de los que tu patrocinador posicione en tu red!
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-emerald-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <Coins className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            Puntos BV Acumulativos
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Nunca pierdes tus puntos. Tienes hasta 180 días continuos para acumular compras y ascender de rango sin recompras forzadas mensuales altas.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-emerald-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            31+ Años de Respaldo Global
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Empresa científica global fundada por la Dra. Deming Li, con laboratorios propios en Michigan y plantaciones de arándano en Canadá.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-emerald-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            Academia Digital HGW 24/7
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Capacitación continua en ventas digitales, prospección automatizada y asesoría médica sin costo adicional en academiahgw.online.
          </p>
        </div>
      </div>

      {/* Interactive Business Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white border border-emerald-500/30 shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              Simulador de Ganancias HGW Panamá
            </div>
            <h3 className="text-2xl font-black text-white mt-1">
              Calcula tu Potencial de Ingresos Mensuales
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Estimación basada en margen comercial del 30%-52% y plan de comisiones
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Nivel de Membresía:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'prejunior', name: 'Prejunior (50 BV)', tag: '30%' },
                  { id: 'junior', name: 'Junior (100 BV)', tag: '30%' },
                  { id: 'senior', name: 'Senior (300 BV)', tag: '30%' },
                  { id: 'master', name: 'Master (600 BV)', tag: '30% + Bono' }
                ].map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id as any)}
                    className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all ${
                      selectedPackage === pkg.id
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20 font-black'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="truncate">{pkg.name}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{pkg.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider: Clientes mensuales */}
            <div className="space-y-2 bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-bold">Clientes con Venta Directa al Mes:</span>
                <span className="text-emerald-400 font-black text-base">{directClients} clientes</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={directClients}
                onChange={(e) => setDirectClients(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 clientes</span>
                <span>20 clientes</span>
                <span>40+ clientes</span>
              </div>
            </div>

            {/* Slider: Socios de equipo */}
            <div className="space-y-2 bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-bold">Nuevos Socios Directos en tu Equipo:</span>
                <span className="text-emerald-400 font-black text-base">{directPartners} socios</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={directPartners}
                onChange={(e) => setDirectPartners(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 socios</span>
                <span>10 socios</span>
                <span>20 socios</span>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-emerald-500/40 shadow-xl space-y-4 text-center flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">
                Ingreso Estimado Mensual
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white text-emerald-300">
                ${estimatedMonthlyIncome.toLocaleString()} <span className="text-sm font-bold text-slate-400">USD</span>
              </div>
              <p className="text-[11px] text-slate-400">
                *Cálculo mensual acumulativo combinando venta al por menor y bonos de red.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-700 space-y-1.5 text-xs text-left">
              <div className="flex justify-between text-slate-300">
                <span>Ganancia Venta Directa:</span>
                <strong className="text-white">${retailProfit} USD</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Bono Inicio y Desarrollo:</span>
                <strong className="text-emerald-400">${networkBonus} USD</strong>
              </div>
            </div>

            <button
              onClick={onOpenRegisterModal}
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <span>Quiero Iniciar mi Negocio HGW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 6 Ways of Earning in HGW */}
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          Las 6 Formas de Ganar Dinero en HGW Panamá
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">1. Venta Directa</span>
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Margen Comercial 30% a 52%</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Compra a precio de socio mayorista y gana margen inmediato vendiendo a precio público oficial.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">2. Inicio Rápido</span>
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">20% hasta 2 Niveles</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Cobras el 20% del valor BV por cada nuevo socio que afilies en tu organización (con Ganancia Mutua 50/50).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">3. Bono de Desarrollo</span>
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Hasta $1.00 en 10 Niveles</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ganas micropagos por cada posición que se active en tu matriz hasta 10 niveles de profundidad sin candados.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">4. Bono de Equipo Mutuo</span>
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">5% al 10% Infinito</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ganas sobre el volumen de BV menor con niveles infinitos, cobrando tanto de tus directos como de tu patrocinador.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">5. Bono de Recompra</span>
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">5% en Matriz 2x10</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ganas regalías mensuales residuales con un reconsumo activo mínimo de solo 10 BV (~$18-$20 USD).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">6. Rangos de Honor</span>
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Viajes, Autos y Fondos</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Califica a Plata, Oro, Diamante y Corona para ganar viajes internacionales todo pagado y bonos para vehículos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
