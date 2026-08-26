import React, { useState, useMemo } from 'react';
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
  Gift,
  ShoppingBag,
  Plus,
  Minus,
  RefreshCw,
  Layers
} from 'lucide-react';
import { SPONSOR_INFO, MEMBERSHIP_PLANS } from '../data/memberships';
import { PRODUCTS } from '../data/products';

interface BusinessSectionProps {
  onOpenRegisterModal: () => void;
  activeTab?: 'plan' | 'calculadora';
  onTabChange?: (tab: 'plan' | 'calculadora') => void;
}

// Representative popular products for quick selection
const POPULAR_SIMULATOR_PRODUCTS = [
  { id: 1001, defaultQty: 0 }, // Berry Juice Smilax ($42 pub - $29.40 soc = $12.60 gain)
  { id: 1013, defaultQty: 0 }, // Blueberry Soluble Coffee ($23 pub - $16 soc = $7.00 gain)
  { id: 1015, defaultQty: 0 }, // Ganoderma Soluble Coffee ($23 pub - $16 soc = $7.00 gain)
  { id: 1002, defaultQty: 0 }, // Blueberry Collagen Peptides ($48 pub - $33.60 soc = $14.40 gain)
  { id: 1046, defaultQty: 0 }, // Pasta Dental Turmalina Negra ($8 pub - $5 soc = $3.00 gain)
  { id: 1033, defaultQty: 0 }, // Toalla Sanitaria Día ($5.50 pub - $3.85 soc = $1.65 gain)
  { id: 1040, defaultQty: 0 }, // Termo Waterson ($95 pub - $65 soc = $30.00 gain)
];

export const BusinessSection: React.FC<BusinessSectionProps> = ({ 
  onOpenRegisterModal,
  activeTab: controlledActiveTab,
  onTabChange
}) => {
  // Top-level tab state ('plan' | 'calculadora')
  const [internalActiveTab, setInternalActiveTab] = useState<'plan' | 'calculadora'>('plan');
  const mainTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const setMainTab = (tab: 'plan' | 'calculadora') => {
    if (onTabChange) onTabChange(tab);
    setInternalActiveTab(tab);
  };

  // Simulator: Product selection & quantities for retail profit calculation (All initial quantities in ZERO)
  const [selectedProductQuantities, setSelectedProductQuantities] = useState<Record<number, number>>({});

  // Additional single product selector
  const [customProductId, setCustomProductId] = useState<number>(1001);
  const [customProductQty, setCustomProductQty] = useState<number>(1);

  // Simulator: Start Bonuses across 2 levels (Initialized in ZERO)
  // Bonus values requested: $5 (Prejunior), $10 (Junior), $30 (Senior), $60 (Master)
  const [level1, setLevel1] = useState<{ prejunior: number; junior: number; senior: number; master: number }>({
    prejunior: 0,
    junior: 0,
    senior: 0,
    master: 0,
  });

  const [level2, setLevel2] = useState<{ prejunior: number; junior: number; senior: number; master: number }>({
    prejunior: 0,
    junior: 0,
    senior: 0,
    master: 0,
  });

  // Active tab inside the calculator
  const [activeCalcTab, setActiveCalcTab] = useState<'products' | 'bonuses'>('products');

  // Bonus rates defined by user
  const BONUS_RATES = {
    prejunior: 5.0,
    junior: 10.0,
    senior: 30.0,
    master: 60.0,
  };

  // Reset all calculator amounts to zero
  const handleResetAllToZero = () => {
    setSelectedProductQuantities({});
    setLevel1({ prejunior: 0, junior: 0, senior: 0, master: 0 });
    setLevel2({ prejunior: 0, junior: 0, senior: 0, master: 0 });
  };

  // Calculate Retail Profit from selected products based on actual discount margin (pricePublic - pricePartner)
  const retailProfitBreakdown = useMemo(() => {
    let totalProfit = 0;
    let totalItems = 0;
    const items: Array<{
      product: typeof PRODUCTS[0];
      qty: number;
      marginPerUnit: number;
      subtotalProfit: number;
    }> = [];

    Object.entries(selectedProductQuantities).forEach(([prodIdStr, rawQty]) => {
      const prodId = Number(prodIdStr);
      const qty = Number(rawQty) || 0;
      if (qty > 0) {
        const product = PRODUCTS.find((p) => p.id === prodId);
        if (product) {
          const margin = Number((product.pricePublic - product.pricePartner).toFixed(2));
          const subtotal = Number((margin * qty).toFixed(2));
          totalProfit += subtotal;
          totalItems += qty;
          items.push({
            product,
            qty,
            marginPerUnit: margin,
            subtotalProfit: subtotal,
          });
        }
      }
    });

    return { totalProfit: Number(totalProfit.toFixed(2)), totalItems, items };
  }, [selectedProductQuantities]);

  // Calculate Level 1 Start Bonus
  const bonusLevel1 = useMemo(() => {
    return (
      level1.prejunior * BONUS_RATES.prejunior +
      level1.junior * BONUS_RATES.junior +
      level1.senior * BONUS_RATES.senior +
      level1.master * BONUS_RATES.master
    );
  }, [level1]);

  // Calculate Level 2 Start Bonus
  const bonusLevel2 = useMemo(() => {
    return (
      level2.prejunior * BONUS_RATES.prejunior +
      level2.junior * BONUS_RATES.junior +
      level2.senior * BONUS_RATES.senior +
      level2.master * BONUS_RATES.master
    );
  }, [level2]);

  const totalStartBonuses = bonusLevel1 + bonusLevel2;
  const totalEstimatedIncome = Number((retailProfitBreakdown.totalProfit + totalStartBonuses).toFixed(2));

  // Handler to update quantity of a product
  const handleUpdateQty = (productId: number, newQty: number) => {
    setSelectedProductQuantities((prev) => {
      const updated = { ...prev };
      if (newQty <= 0) {
        delete updated[productId];
      } else {
        updated[productId] = newQty;
      }
      return updated;
    });
  };

  // Handler to add custom product to calculation
  const handleAddCustomProduct = () => {
    if (customProductQty > 0) {
      handleUpdateQty(customProductId, (selectedProductQuantities[customProductId] || 0) + customProductQty);
    }
  };

  return (
    <section id="negocio-hgw-section" className="my-14 space-y-8">
      {/* Top Main Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 p-1.5 bg-slate-200/80 dark:bg-slate-850 rounded-2xl max-w-2xl mx-auto border border-slate-300 dark:border-slate-700/80 shadow-xs">
        <button
          type="button"
          onClick={() => setMainTab('plan')}
          className={`w-full sm:w-1/2 py-3 px-5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
            mainTab === 'plan'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>Modelo de Negocio & Plan 50/50</span>
        </button>

        <button
          type="button"
          onClick={() => setMainTab('calculadora')}
          className={`w-full sm:w-1/2 py-3 px-5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
            mainTab === 'calculadora'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Calculator className="w-4 h-4 text-emerald-300" />
          <span>Calculadora de Ganancias</span>
        </button>
      </div>

      {mainTab === 'plan' ? (
        /* PESTAÑA 1: MODELO DE NEGOCIO & PLAN DE COMPENSACIÓN */
        <div className="space-y-10 animate-in fade-in-50 duration-200">
          {/* Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 text-xs font-black uppercase tracking-wider shadow-xs">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Oportunidad de Negocio & Emprendimiento
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Emprende con el Modelo de <span className="text-emerald-600 dark:text-emerald-400">Ganancia Mutua 50/50</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
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
                Único en la industria: ganas el 50% de las comisiones de tu línea descendente ¡y también de los que tu patrocinador posicione en tu red!
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
                Capacitación continua en ventas digitales, prospección automatizada y asesoría de producto y nutrición sin costo adicional en academiahgw.online.
              </p>
            </div>
          </div>

          {/* Quick CTA to switch to calculator */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <Calculator className="w-5 h-5 text-emerald-400" />
                ¿Quieres simular tus posibles ganancias mensuales?
              </h4>
              <p className="text-xs text-slate-300">
                Usa nuestra calculadora interactiva para calcular ventas directas y bonos de inicio por equipo.
              </p>
            </div>
            <button
              onClick={() => setMainTab('calculadora')}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md shrink-0 flex items-center gap-1.5"
            >
              <span>Abrir Calculadora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 Ways of Earning in HGW */}
          <div className="space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Plan de Compensación Exclusivo
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Las 6 Formas de Ganar Dinero en HGW Panamá
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Múltiples fuentes de ingresos simultáneos: desde venta directa hasta regalías de red global.
              </p>
            </div>

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
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">$5, $10, $30 y $60 hasta 2 Niveles</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ganas $5.00 por Prejunior, $10 por Junior, $30 por Senior y $60 por Master tanto en directos como en duplicación de equipo.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">3. Bono de Desarrollo</span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Hasta $3.00 en 10 Niveles</h4>
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
        </div>
      ) : (
        /* PESTAÑA 2: CALCULADORA DE GANANCIAS EN PESTAÑA APARTE */
        <div className="animate-in fade-in-50 duration-200">
          <div className="p-4 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white border border-emerald-500/30 shadow-2xl space-y-6 sm:space-y-8">
            {/* Calculator Header */}
            <div className="text-center space-y-2 border-b border-slate-800 pb-5 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60">
                <Calculator className="w-4 h-4" />
                Calculadora Dinámica de Posibles Ganancias HGW
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                Simula tus Ganancias por Ventas y Bonos de Inicio
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Margen exacto (P. Público - P. Socio) + Bonos de Inicio ($5, $10, $30, $60) hasta 2 niveles
              </p>
            </div>

            {/* Subtab Selector inside calculator */}
            <div className="flex flex-col sm:flex-row gap-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveCalcTab('products')}
                className={`flex-1 px-4 py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                  activeCalcTab === 'products'
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>1. Venta Directa (Margen por Producto)</span>
                <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-900/50 text-[10px] text-white font-mono">
                  ${retailProfitBreakdown.totalProfit.toFixed(2)}
                </span>
              </button>
              <button
                onClick={() => setActiveCalcTab('bonuses')}
                className={`flex-1 px-4 py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                  activeCalcTab === 'bonuses'
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>2. Bonos de Inicio ($5, $10, $30, $60)</span>
                <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-900/50 text-[10px] text-white font-mono">
                  ${totalStartBonuses.toFixed(2)}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Main Controls Area (Tabs) */}
              <div className="lg:col-span-2 space-y-6">
                {activeCalcTab === 'products' ? (
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-slate-300">
                      <span className="font-bold">Ajusta la cantidad mensual de productos que planeas distribuir:</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedProductQuantities({})}
                          className="text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" /> Poner productos en 0
                        </button>
                        <span className="text-slate-600">|</span>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedProductQuantities({
                              1001: 5,
                              1013: 10,
                              1015: 10,
                              1002: 4,
                              1046: 12,
                              1040: 2,
                            })
                          }
                          className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                        >
                          Cargar ejemplo
                        </button>
                      </div>
                    </div>

                    {/* List of active products in calculator */}
                    <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                      {POPULAR_SIMULATOR_PRODUCTS.map(({ id }) => {
                        const prod = PRODUCTS.find((p) => p.id === id);
                        if (!prod) return null;
                        const qty = selectedProductQuantities[id] || 0;
                        const margin = Number((prod.pricePublic - prod.pricePartner).toFixed(2));
                        const subtotal = Number((margin * qty).toFixed(2));

                        return (
                          <div
                            key={id}
                            className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                              qty > 0
                                ? 'bg-slate-800/90 border-emerald-500/40'
                                : 'bg-slate-800/40 border-slate-800 opacity-60'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-11 h-11 object-contain rounded-lg bg-white/10 p-1 shrink-0"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  if (prod.fallbackImage && e.currentTarget.src !== prod.fallbackImage) {
                                    e.currentTarget.src = prod.fallbackImage;
                                  }
                                }}
                              />
                              <div>
                                <h5 className="font-bold text-xs text-white leading-tight">{prod.name}</h5>
                                <div className="flex items-center gap-2 text-[11px] text-slate-300 mt-1">
                                  <span>P. Público: <strong className="text-white">${prod.pricePublic.toFixed(2)}</strong></span>
                                  <span>•</span>
                                  <span>P. Socio: <strong className="text-emerald-400">${prod.pricePartner.toFixed(2)}</strong></span>
                                  <span>•</span>
                                  <span className="text-amber-300 font-bold">Margen: +${margin.toFixed(2)}/u</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between w-full sm:w-auto gap-4 self-end sm:self-center">
                              {/* Qty controls */}
                              <div className="flex items-center gap-2 bg-slate-900/80 px-2.5 py-1 rounded-xl border border-slate-700">
                                <button
                                  onClick={() => handleUpdateQty(id, qty - 1)}
                                  className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-7 text-center font-black text-xs text-white">{qty}</span>
                                <button
                                  onClick={() => handleUpdateQty(id, qty + 1)}
                                  className="w-6 h-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center font-bold text-xs"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              {/* Subtotal */}
                              <div className="text-right min-w-[75px]">
                                <span className="text-[10px] text-slate-400 block">Ganancia</span>
                                <span className="font-black text-xs text-emerald-400">${subtotal.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add other products dropdown */}
                    <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700 flex flex-col sm:flex-row items-center gap-3">
                      <span className="text-xs text-slate-300 font-bold shrink-0">Agregar otro producto:</span>
                      <select
                        value={customProductId}
                        onChange={(e) => setCustomProductId(Number(e.target.value))}
                        className="w-full sm:w-auto flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        {PRODUCTS.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} (Gana ${(p.pricePublic - p.pricePartner).toFixed(2)}/u)
                          </option>
                        ))}
                      </select>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={customProductQty}
                          onChange={(e) => setCustomProductQty(Math.max(1, Number(e.target.value)))}
                          className="w-16 bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-center text-white"
                        />
                        <button
                          onClick={handleAddCustomProduct}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Tab 2: Bonos de Inicio Rápido ($5 Prejunior, $10 Junior, $30 Senior, $60 Master hasta 2 niveles) */
                  <div className="space-y-6">
                    <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-200">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <strong>Estructura oficial de Bonos de Inicio:</strong>
                        <button
                          type="button"
                          onClick={() => {
                            setLevel1({ prejunior: 0, junior: 0, senior: 0, master: 0 });
                            setLevel2({ prejunior: 0, junior: 0, senior: 0, master: 0 });
                          }}
                          className="text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" /> Poner bonos en 0
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 font-mono">
                        <span className="bg-slate-900/60 px-2 py-1 rounded-lg">Prejunior: <strong>$5.00</strong></span>
                        <span className="bg-slate-900/60 px-2 py-1 rounded-lg">Junior: <strong>$10.00</strong></span>
                        <span className="bg-slate-900/60 px-2 py-1 rounded-lg">Senior: <strong>$30.00</strong></span>
                        <span className="bg-slate-900/60 px-2 py-1 rounded-lg">Master: <strong>$60.00</strong></span>
                      </div>
                      <span className="block mt-2 text-[11px] text-slate-300">
                        *Ganas estos valores por cada nuevo socio afiliado en tu organización hasta en dos niveles de profundidad.
                      </span>
                    </div>

                    {/* Level 1: Directos */}
                    <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                            <Layers className="w-4 h-4 text-emerald-400" />
                            Nivel 1: Tus Nuevos Socios Directos
                          </h4>
                          <span className="text-[11px] text-slate-400">Personas que registras directamente contigo</span>
                        </div>
                        <span className="text-xs font-black text-emerald-400 bg-slate-900 px-2.5 py-1 rounded-xl">
                          Subtotal: ${bonusLevel1.toFixed(2)} USD
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        {/* Prejunior Level 1 */}
                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/80 space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-300 font-bold">Prejunior ($5)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => setLevel1((p) => ({ ...p, prejunior: Math.max(0, p.prejunior - 1) }))}
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="font-black text-sm text-emerald-400">{level1.prejunior}</span>
                            <button
                              onClick={() => setLevel1((p) => ({ ...p, prejunior: p.prejunior + 1 }))}
                              className="w-6 h-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs flex items-center justify-center text-white"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 block text-center">
                            = ${(level1.prejunior * BONUS_RATES.prejunior).toFixed(2)}
                          </span>
                        </div>

                        {/* Junior Level 1 */}
                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/80 space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-300 font-bold">Junior ($10)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => setLevel1((p) => ({ ...p, junior: Math.max(0, p.junior - 1) }))}
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="font-black text-sm text-emerald-400">{level1.junior}</span>
                            <button
                              onClick={() => setLevel1((p) => ({ ...p, junior: p.junior + 1 }))}
                              className="w-6 h-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs flex items-center justify-center text-white"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 block text-center">
                            = ${(level1.junior * BONUS_RATES.junior).toFixed(2)}
                          </span>
                        </div>

                        {/* Senior Level 1 */}
                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/80 space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-300 font-bold">Senior ($30)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => setLevel1((p) => ({ ...p, senior: Math.max(0, p.senior - 1) }))}
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="font-black text-sm text-emerald-400">{level1.senior}</span>
                            <button
                              onClick={() => setLevel1((p) => ({ ...p, senior: p.senior + 1 }))}
                              className="w-6 h-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs flex items-center justify-center text-white"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 block text-center">
                            = ${(level1.senior * BONUS_RATES.senior).toFixed(2)}
                          </span>
                        </div>

                        {/* Master Level 1 */}
                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-emerald-300 font-bold">Master ($60)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => setLevel1((p) => ({ ...p, master: Math.max(0, p.master - 1) }))}
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="font-black text-sm text-emerald-300">{level1.master}</span>
                            <button
                              onClick={() => setLevel1((p) => ({ ...p, master: p.master + 1 }))}
                              className="w-6 h-6 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-xs flex items-center justify-center text-slate-950 font-bold"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[10px] text-emerald-400 block text-center">
                            = ${(level1.master * BONUS_RATES.master).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Level 2: Duplicación de Equipo */}
                    <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                            <Layers className="w-4 h-4 text-teal-400" />
                            Nivel 2: Socios Afiliados por tu Equipo
                          </h4>
                          <span className="text-[11px] text-slate-400">Duplicación de tu red hasta segundo nivel</span>
                        </div>
                        <span className="text-xs font-black text-teal-300 bg-slate-900 px-2.5 py-1 rounded-xl">
                          Subtotal: ${bonusLevel2.toFixed(2)} USD
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        {/* Prejunior Level 2 */}
                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/80 space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-300 font-bold">Prejunior ($5)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => setLevel2((p) => ({ ...p, prejunior: Math.max(0, p.prejunior - 1) }))}
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="font-black text-sm text-teal-400">{level2.prejunior}</span>
                            <button
                              onClick={() => setLevel2((p) => ({ ...p, prejunior: p.prejunior + 1 }))}
                              className="w-6 h-6 rounded-lg bg-teal-600 hover:bg-teal-500 text-xs flex items-center justify-center text-white"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 block text-center">
                            = ${(level2.prejunior * BONUS_RATES.prejunior).toFixed(2)}
                          </span>
                        </div>

                        {/* Junior Level 2 */}
                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/80 space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-300 font-bold">Junior ($10)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => setLevel2((p) => ({ ...p, junior: Math.max(0, p.junior - 1) }))}
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="font-black text-sm text-teal-400">{level2.junior}</span>
                            <button
                              onClick={() => setLevel2((p) => ({ ...p, junior: p.junior + 1 }))}
                              className="w-6 h-6 rounded-lg bg-teal-600 hover:bg-teal-500 text-xs flex items-center justify-center text-white"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 block text-center">
                            = ${(level2.junior * BONUS_RATES.junior).toFixed(2)}
                          </span>
                        </div>

                        {/* Senior Level 2 */}
                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/80 space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-300 font-bold">Senior ($30)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => setLevel2((p) => ({ ...p, senior: Math.max(0, p.senior - 1) }))}
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="font-black text-sm text-teal-400">{level2.senior}</span>
                            <button
                              onClick={() => setLevel2((p) => ({ ...p, senior: p.senior + 1 }))}
                              className="w-6 h-6 rounded-lg bg-teal-600 hover:bg-teal-500 text-xs flex items-center justify-center text-white"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 block text-center">
                            = ${(level2.senior * BONUS_RATES.senior).toFixed(2)}
                          </span>
                        </div>

                        {/* Master Level 2 */}
                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-teal-500/40 bg-teal-950/20 space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-teal-300 font-bold">Master ($60)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => setLevel2((p) => ({ ...p, master: Math.max(0, p.master - 1) }))}
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="font-black text-sm text-teal-300">{level2.master}</span>
                            <button
                              onClick={() => setLevel2((p) => ({ ...p, master: p.master + 1 }))}
                              className="w-6 h-6 rounded-lg bg-teal-500 hover:bg-teal-400 text-xs flex items-center justify-center text-slate-950 font-bold"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[10px] text-teal-400 block text-center">
                            = ${(level2.master * BONUS_RATES.master).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Results Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-2xl space-y-5 text-center flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">
                    Total Ingreso Estimado Mensual
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white text-emerald-300">
                    ${totalEstimatedIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                    <span className="text-sm font-bold text-slate-400">USD</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Suma de margen comercial directo + bonos de inicio de red hasta nivel 2.
                  </p>
                </div>

                {/* Detailed itemized breakdown */}
                <div className="pt-4 border-t border-slate-700 space-y-2 text-xs text-left">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Venta Directa ({retailProfitBreakdown.totalItems} unidades):</span>
                    <strong className="text-white font-mono font-black">${retailProfitBreakdown.totalProfit.toFixed(2)} USD</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Bonos Inicio Nivel 1:</span>
                    <strong className="text-emerald-400 font-mono font-black">${bonusLevel1.toFixed(2)} USD</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Bonos Inicio Nivel 2:</span>
                    <strong className="text-teal-400 font-mono font-black">${bonusLevel2.toFixed(2)} USD</strong>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                    <span>Total Bonos de Equipo:</span>
                    <strong className="text-emerald-300 font-mono">${totalStartBonuses.toFixed(2)} USD</strong>
                  </div>
                </div>

                {totalEstimatedIncome > 0 && (
                  <button
                    type="button"
                    onClick={handleResetAllToZero}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700 hover:border-rose-500/40"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Poner todas las cantidades en cero ($0.00)</span>
                  </button>
                )}

                <button
                  onClick={onOpenRegisterModal}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <span>Quiero Iniciar mi Negocio HGW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Patrocinador Oficial: {SPONSOR_INFO.name} ({SPONSOR_INFO.code})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
