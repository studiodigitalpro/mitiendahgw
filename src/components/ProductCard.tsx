import React, { useState } from 'react';
import { Eye, MessageCircle, Sparkles, AlertTriangle } from 'lucide-react';
import { Product } from '../types';
import { SPONSOR_INFO } from '../data/memberships';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
  onQuickQuote?: (product: Product) => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
  isPartnerMode: boolean; // whether current user sees partner prices directly or has 50 BV
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetail,
  onQuickQuote,
  onAddToCart,
  isPartnerMode
}) => {
  const [imgError, setImgError] = useState(false);

  const handleQuoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickQuote) {
      onQuickQuote(product);
    } else {
      onViewDetail(product);
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onViewDetail(product)}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Top badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.badge && (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600/90 backdrop-blur-sm text-white shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      <div className="absolute top-3 right-3 z-10">
        <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-slate-900/90 backdrop-blur-sm text-emerald-400 border border-emerald-500/40 shadow-sm">
          {product.bv.toFixed(2)} BV
        </span>
      </div>

      {/* Image container */}
      <div className="h-52 w-full bg-slate-50 dark:bg-slate-950/60 p-4 flex items-center justify-center relative overflow-hidden group-hover:bg-emerald-50/30 dark:group-hover:bg-emerald-950/20 transition-colors">
        <img
          src={imgError && product.fallbackImage ? product.fallbackImage : product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="max-h-full max-w-full object-contain transform group-hover:scale-108 transition-transform duration-300"
          loading="lazy"
        />

        {/* Quick view overlay button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetail(product);
          }}
          className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-emerald-500 hover:text-white"
          title="Ver detalles completos"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
            {product.categoryLabel}
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Direct WhatsApp Action Section */}
        <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          {/* Price Container: PRECIO PÚBLICO DESTACADO PRIMERO, LUEGO PRECIO SOCIO */}
          <div className="space-y-1.5 bg-slate-50/90 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            {/* 1. PRECIO PÚBLICO (Destacado Principal) */}
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">
                Precio Público:
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  ${product.pricePublic.toFixed(2)}
                </span>
                <span className="text-[10px] font-bold text-slate-400">USD</span>
              </div>
            </div>

            {/* 2. PRECIO SOCIO (Después / Descuento HGW) */}
            <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 dark:border-slate-700/70 text-xs">
              <div className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>Precio Socio:</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400">
                  ${product.pricePartner.toFixed(2)}
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50">
                  -30%
                </span>
              </div>
            </div>
          </div>

          {/* Stock availability warning */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-[10.5px] font-bold leading-tight">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Verificar stock disponible antes de comprar</span>
          </div>

          <button
            id={`btn-quote-whatsapp-${product.id}`}
            type="button"
            onClick={handleQuoteClick}
            className="w-full py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md bg-[#25D366] hover:bg-[#20bd5a] text-white active:scale-98 shadow-green-600/20 cursor-pointer"
            aria-label={`Cotizar ${product.name} por WhatsApp`}
          >
            <MessageCircle className="w-4 h-4 fill-white/20 shrink-0" />
            <span>Cotizar por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
