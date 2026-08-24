import React, { useState } from 'react';
import { X, ShoppingBag, CheckCircle, Sparkles, AlertCircle, ShieldAlert, Award, Package, HeartPulse, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  cartBV: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  cartBV
}) => {
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  if (!isOpen || !product) return null;

  const isPartnerTier = cartBV >= 50;
  const currentPrice = isPartnerTier ? product.pricePartner : product.pricePublic;
  const savings = Number((product.pricePublic - product.pricePartner).toFixed(2));

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <div
      id="modal-product-detail-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="modal-product-detail-container"
        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="btn-close-product-detail"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 p-2 rounded-full transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Badges */}
          <div className="bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
            <div className="w-full max-w-xs aspect-square relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900/60 p-4 flex items-center justify-center shadow-md border border-slate-100 dark:border-slate-800">
              <img
                src={imgError && product.fallbackImage ? product.fallbackImage : product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="max-h-full max-w-full object-contain transform hover:scale-105 transition-transform duration-300"
              />

              {product.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full shadow-sm">
                  {product.badge}
                </span>
              )}

              <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-slate-900/90 text-emerald-400 text-xs font-extrabold rounded-lg border border-emerald-500/30">
                {product.bv} BV
              </span>
            </div>

            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-xs">
                <span className="text-emerald-800 dark:text-emerald-300 font-semibold">Valor en Puntos (BV):</span>
                <strong className="text-emerald-700 dark:text-emerald-400 font-extrabold text-sm">{product.bv} BV</strong>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Presentación:</span>
                <strong className="text-slate-900 dark:text-slate-200 text-right">{product.presentation}</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Pricing */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                {product.categoryLabel}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 leading-tight">
                {product.name}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                {product.description || product.shortDescription}
              </p>
            </div>

            {/* Price Box: PRECIO PÚBLICO DESTACADO PRIMERO, LUEGO PRECIO SOCIO */}
            <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              {/* 1. Precio Público Destacado */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    Precio Público Oficial:
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                      ${product.pricePublic.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-slate-500">USD</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700">
                  Venta Regular
                </span>
              </div>

              {/* 2. Precio Socio (Después) */}
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Precio Socio (-30% Descuento):
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                      ${product.pricePartner.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-emerald-600/80 dark:text-emerald-400/80">USD</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-sm">
                    Ahorras ${savings.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-1">
                <span>
                  {isPartnerTier ? '✅ Tu pedido acumula 50+ BV (Precio Socio aplicado)' : '💡 Acumula 50 BV en tu orden para activar el Precio Socio'}
                </span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{product.bv} BV</span>
              </div>
            </div>

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Beneficios y Propiedades Clave:
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-emerald-500" />
                  Ingredientes Activos:
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Usage */}
            {product.usage && (
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white block mb-1">Modo de Uso:</strong>
                {product.usage}
              </div>
            )}

            {/* Warnings */}
            {product.warnings && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{product.warnings}</span>
              </div>
            )}

            {/* Add to Cart Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-bold text-sm text-slate-900 dark:text-white min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold transition-colors"
                >
                  +
                </button>
              </div>

              <button
                id="btn-modal-add-to-cart"
                onClick={handleAdd}
                className="flex-1 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Añadir al Carrito ({quantity * product.bv} BV)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
