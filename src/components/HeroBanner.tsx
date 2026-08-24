import React from 'react';
import { Sparkles, ShieldCheck, Truck, Award, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { SPONSOR_INFO } from '../data/memberships';

interface HeroBannerProps {
  onExploreProducts: () => void;
  onOpenMemberships: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreProducts,
  onOpenMemberships
}) => {
  return (
    <div id="hero-banner" className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white p-6 sm:p-10 lg:p-12 border border-emerald-500/20 shadow-2xl my-6">
      {/* Visual background glows */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column Text */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Salud, Bienestar & Plan de Ganancia Mutua 50/50
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            Mundo Verde Saludable <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
              Productos Naturales de Alta Gama
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Descubre nuestra línea a base de <strong>Extractos de Arándanos Azules de Canadá</strong>, <strong>Nanotecnología de Turmalina con Iones Negativos</strong>, <strong>Ganoderma Lucidum</strong>, <strong>Cordyceps Sinensis</strong> y <strong>Spirulina Plus</strong>.
          </p>

          {/* Pricing Model Highlight Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <span className="text-xs text-slate-400 font-bold uppercase block">1. Precio Público</span>
              <p className="text-xs text-slate-300 mt-1">
                Compra al detalle sin mínimos, con entrega a todo Panamá por Servientrega.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-bold uppercase block">2. Precio Socio (-30%)</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500 text-slate-950">Mín. 50 BV</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                30% de descuento en activación y recompras al acumular <strong>50 BV en productos libres</strong>.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              id="btn-hero-explore-products"
              onClick={onExploreProducts}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm sm:text-base transition-all duration-200 shadow-xl shadow-emerald-500/25 flex items-center gap-2 active:scale-95"
            >
              <span>Ver Catálogo de Productos</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="btn-hero-open-memberships"
              onClick={onOpenMemberships}
              className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-white font-bold text-sm sm:text-base border border-emerald-500/30 transition-all flex items-center gap-2 active:scale-95"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Planes de Membresía</span>
            </button>
          </div>

          {/* Key Trust Badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-3 border-t border-slate-800">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Certificaciones FDA, ISO 9001, Halal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Envíos a todo Panamá</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantía Oficial HGW</span>
            </div>
          </div>
        </div>

        {/* Right Column Featured Products Visual */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden bg-gradient-to-tr from-emerald-900/60 to-slate-800/90 border border-emerald-500/30 p-6 flex flex-col items-center justify-between shadow-2xl">
            {/* Top badge */}
            <div className="w-full flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                Línea Destacada
              </span>
              <span className="text-xs text-emerald-300 font-mono">HGW Panamá</span>
            </div>

            {/* Product Center Preview */}
            <div className="my-auto text-center space-y-3">
              <img
                src="https://hgwpanama.com/wp-content/uploads/2026/08/BLUEBERRY-CANDY-HGW.webp"
                alt="Blueberry Candy HGW"
                referrerPolicy="no-referrer"
                className="w-40 h-40 object-contain mx-auto transform hover:scale-110 transition-transform duration-300"
              />
              <div>
                <h4 className="text-base font-extrabold text-white">Blueberry Candy & Cafés Saludables</h4>
                <p className="text-xs text-slate-300">Extracto concentrado de arándanos canadienses</p>
              </div>
            </div>

            {/* Bottom mini card */}
            <div className="w-full bg-slate-950/80 rounded-xl p-2.5 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Socio HGW:</span>
                <strong className="text-emerald-400 font-bold">{SPONSOR_INFO.name}</strong>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Código:</span>
                <strong className="text-white font-mono">{SPONSOR_INFO.code}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
