import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  CheckCircle, 
  Sparkles, 
  AlertCircle, 
  Package, 
  Info, 
  HeartPulse, 
  FileText, 
  Layers, 
  Maximize2, 
  Minimize2,
  ShieldCheck,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import { Product } from '../types';
import { SPONSOR_INFO } from '../data/memberships';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  cartBV: number;
}

type TabType = 'general' | 'benefits' | 'ingredients' | 'usage';
type ModalSizeMode = 'standard' | 'wide' | 'compact';

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  cartBV
}) => {
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [sizeMode, setSizeMode] = useState<ModalSizeMode>('standard');

  if (!isOpen || !product) return null;

  const isPartnerTier = cartBV >= 50;
  const currentPrice = isPartnerTier ? product.pricePartner : product.pricePublic;
  const savings = Number((product.pricePublic - product.pricePartner).toFixed(2));

  const handleWhatsAppQuote = () => {
    const phone = SPONSOR_INFO.whatsapp.replace(/[^0-9]/g, '');
    const totalPublic = (product.pricePublic * quantity).toFixed(2);
    const totalPartner = (product.pricePartner * quantity).toFixed(2);
    const totalBV = (product.bv * quantity).toFixed(2);

    const message = `¡Hola ${SPONSOR_INFO.name}! 👋 Deseo cotizar el siguiente producto de HGW Panamá:

📦 *Producto:* ${product.name}
🔢 *Cantidad:* ${quantity} unidad(es)
💵 *Precio Público:* B/. ${totalPublic} USD (${quantity > 1 ? `B/. ${product.pricePublic.toFixed(2)} c/u` : 'precio regular'})
🏷️ *Precio Socio (-30%):* B/. ${totalPartner} USD (${totalBV} BV)

🛵 *Modalidad de entrega:* (Por favor indique si desea Envío a domicilio o Retiro en almacén en Panamá)

¿Me podrías confirmar disponibilidad y coordinar la compra? ¡Muchas gracias!`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  // Sizing classes based on user selection
  const sizeClasses = {
    compact: 'max-w-2xl',
    standard: 'max-w-4xl',
    wide: 'max-w-6xl'
  }[sizeMode];

  return (
    <div
      id="modal-product-detail-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="modal-product-detail-container"
        className={`bg-white dark:bg-slate-900 text-black dark:text-white w-full ${sizeClasses} rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative my-auto max-h-[92vh] flex flex-col transition-all duration-300 animate-in fade-in zoom-in-95`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar: Size adjusters & Close */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700/80 shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Detalle HGW</span>
            <div className="hidden sm:inline-flex bg-white dark:bg-slate-900 rounded-lg p-0.5 border border-slate-300 dark:border-slate-700 shadow-xs">
              <button
                type="button"
                onClick={() => setSizeMode('compact')}
                className={`px-2.5 py-1 text-[11px] rounded-md font-extrabold transition-colors ${
                  sizeMode === 'compact'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Vista Compacta"
              >
                Compacto
              </button>
              <button
                type="button"
                onClick={() => setSizeMode('standard')}
                className={`px-2.5 py-1 text-[11px] rounded-md font-extrabold transition-colors ${
                  sizeMode === 'standard'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Vista Estándar"
              >
                Estándar
              </button>
              <button
                type="button"
                onClick={() => setSizeMode('wide')}
                className={`px-2.5 py-1 text-[11px] rounded-md font-extrabold transition-colors ${
                  sizeMode === 'wide'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Vista Expandida"
              >
                Expandido
              </button>
            </div>
          </div>

          <button
            id="btn-close-product-detail"
            onClick={onClose}
            className="bg-white dark:bg-slate-700 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-700 dark:text-slate-200 hover:text-red-600 p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 transition-colors shadow-xs"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto flex-1">
          {/* Left Column: Product Image & Quick Specs (4 cols) */}
          <div className="md:col-span-5 lg:col-span-4 bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
            <div className="w-full flex flex-col items-center">
              <div className="w-full max-w-[200px] sm:max-w-[240px] aspect-square relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 p-3 sm:p-4 flex items-center justify-center shadow-md border border-slate-200 dark:border-slate-800">
                <img
                  src={imgError && product.fallbackImage ? product.fallbackImage : product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="max-h-full max-w-full object-contain transform hover:scale-105 transition-transform duration-300"
                />

                {product.badge && (
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-emerald-600 text-white text-[11px] font-black rounded-full shadow-sm">
                    {product.badge}
                  </span>
                )}

                <span className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/90 text-emerald-400 text-xs font-black rounded-lg border border-emerald-500/30">
                  {product.bv} BV
                </span>
              </div>

              <div className="mt-4 w-full space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/50">
                  <span className="text-emerald-900 dark:text-emerald-300 font-bold">Puntos HGW:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-black text-sm">{product.bv} BV</strong>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-700 dark:text-slate-300 font-bold">Presentación:</span>
                  <strong className="text-black dark:text-white font-extrabold text-right">{product.presentation}</strong>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-700 dark:text-slate-300 font-bold">Categoría:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-extrabold text-right">{product.categoryLabel}</strong>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 w-full text-center">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Garantía y Registro HGW Panamá
              </span>
            </div>
          </div>

          {/* Right Column: Centered Header, Navigation Tabs & Contents (8 cols) */}
          <div className="md:col-span-7 lg:col-span-8 p-4 sm:p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Centered Product Title & Subtitle */}
              <div className="text-center space-y-1">
                <span className="text-xs font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400 inline-block px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                  {product.categoryLabel}
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black dark:text-white leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {product.presentation} · Código oficial HGW Panamá
                </p>
              </div>

              {/* Navigation Tabs - Mobile Optimized Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveTab('general')}
                  className={`py-2 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all ${
                    activeTab === 'general'
                      ? 'bg-white dark:bg-slate-900 text-black dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">General</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('benefits')}
                  className={`py-2 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all ${
                    activeTab === 'benefits'
                      ? 'bg-white dark:bg-slate-900 text-black dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <HeartPulse className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Beneficios</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('ingredients')}
                  className={`py-2 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all ${
                    activeTab === 'ingredients'
                      ? 'bg-white dark:bg-slate-900 text-black dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <Package className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Ingredientes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('usage')}
                  className={`py-2 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all ${
                    activeTab === 'usage'
                      ? 'bg-white dark:bg-slate-900 text-black dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Uso & Dosis</span>
                </button>
              </div>

              {/* TAB 1: General & Precios */}
              {activeTab === 'general' && (
                <div className="space-y-4 animate-in fade-in-50 duration-200">
                  <p className="text-black dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/40 p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center sm:text-left">
                    {product.description || product.shortDescription}
                  </p>

                  {/* Price Box: PRECIO PÚBLICO DESTACADO PRIMERO, LUEGO PRECIO SOCIO */}
                  <div className="space-y-2.5 p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    {/* 1. Precio Público Destacado */}
                    <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-xs">
                      <div>
                        <span className="text-xs font-black text-slate-800 dark:text-slate-300 uppercase tracking-wider block">
                          Precio Público Oficial:
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-2xl sm:text-3xl font-black text-black dark:text-white">
                            ${product.pricePublic.toFixed(2)}
                          </span>
                          <span className="text-xs font-bold text-slate-500">USD</span>
                        </div>
                      </div>
                      <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-black dark:text-white text-xs font-black border border-slate-300 dark:border-slate-700">
                        Venta Regular
                      </span>
                    </div>

                    {/* 2. Precio Socio */}
                    <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-600/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          Precio Socio (-30% Descuento):
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
                            ${product.pricePartner.toFixed(2)}
                          </span>
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">USD</span>
                        </div>
                      </div>
                      <div className="self-start sm:self-center">
                        <span className="inline-block px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black shadow-sm">
                          Ahorras ${savings.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-700 dark:text-slate-300 pt-1 gap-1">
                      <span className="font-medium text-center sm:text-left">
                        {isPartnerTier ? '✅ Tu orden califica con 50+ BV (Precio Socio aplicado)' : '💡 Acumula 50 BV en tu carrito para activar el Precio Socio'}
                      </span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400 text-center sm:text-right">{product.bv} BV</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Beneficios */}
              {activeTab === 'benefits' && (
                <div className="space-y-3 animate-in fade-in-50 duration-200">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                    <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Nutrición Celular y Beneficios de Bienestar:
                    </h4>
                    {product.benefits && product.benefits.length > 0 ? (
                      <ul className="space-y-2 text-xs sm:text-sm text-black dark:text-slate-200">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        Formulado bajo estándares biotecnológicos de Green World Group para el bienestar integral.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: Ingredientes */}
              {activeTab === 'ingredients' && (
                <div className="space-y-3 animate-in fade-in-50 duration-200">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-3">
                      <Package className="w-4 h-4 text-emerald-600" />
                      Componentes y Extractos Naturales:
                    </h4>
                    {product.ingredients && product.ingredients.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {product.ingredients.map((ing, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-800 text-black dark:text-white border border-slate-300 dark:border-slate-600 font-bold shadow-xs"
                          >
                            🌿 {ing}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        Extractos puros de origen natural certificados con Buenas Prácticas de Manufactura (GMP) y FDA.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: Modo de Uso & Dosis */}
              {activeTab === 'usage' && (
                <div className="space-y-3 animate-in fade-in-50 duration-200">
                  {product.usage && (
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-black dark:text-slate-200 font-medium space-y-2">
                      <strong className="text-black dark:text-white font-black block text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        📋 Instrucciones de Consumo / Aplicación:
                      </strong>
                      <p>{product.usage}</p>
                    </div>
                  )}

                  {product.warnings && (
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-600/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5 font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                      <div>
                        <strong className="block font-black uppercase text-[11px] mb-0.5">Recomendaciones & Advertencias:</strong>
                        <span>{product.warnings}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Add to Cart Footer */}
            <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center justify-between sm:justify-start border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                <span className="text-xs font-bold text-slate-500 px-3 sm:hidden">Cantidad:</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-black transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center text-base"
                    aria-label="Disminuir cantidad"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-black text-base text-black dark:text-white min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-black transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center text-base"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                id="btn-modal-quote-whatsapp"
                type="button"
                onClick={handleWhatsAppQuote}
                className="flex-1 py-3.5 px-4 sm:px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] text-white font-black text-sm sm:text-base transition-all duration-200 shadow-lg shadow-green-600/25 flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20 shrink-0" />
                <span className="truncate">Cotizar por WhatsApp ({quantity} {quantity === 1 ? 'unidad' : 'unidades'})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

