import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Award, Search, X, Menu, Phone, HeartHandshake, ShieldCheck, Tag } from 'lucide-react';
import { ProductCategory } from '../types';
import { SPONSOR_INFO } from '../data/memberships';

interface HeaderProps {
  cartCount: number;
  cartBV: number;
  onOpenCart: () => void;
  onOpenMemberships: () => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isPartnerMode: boolean;
  onTogglePartnerMode: (val: boolean) => void;
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'serie-cafes', label: '☕ Cafés Saludables' },
  { id: 'alimentos', label: '🫐 Alimentos & Bebidas' },
  { id: 'serie-candy', label: '🍬 Serie Candy' },
  { id: 'cuidado-personal', label: '🌿 Cuidado Personal' },
  { id: 'accesorios', label: '💎 Turmalina & Accesorios' },
  { id: 'equipo', label: '⚡ Equipos & Termos' },
  { id: 'suplementos', label: '💊 Suplementos' },
  { id: 'licores', label: '🍷 Vinos' }
];

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartBV,
  onOpenCart,
  onOpenMemberships,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  isPartnerMode,
  onTogglePartnerMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      {/* Top Notification bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium flex items-center justify-between overflow-hidden">
        <div className="hidden md:flex items-center gap-2">
          <span>🇵🇦 Panamá Oficial</span>
          <span className="opacity-50">|</span>
          <span>Código Patrocinador: <strong>{SPONSOR_INFO.code}</strong></span>
        </div>

        <div className="flex-1 text-center font-semibold text-emerald-200">
          ✨ ¡30% Descuento de Socio automático al comprar mínimo <strong>50 BV</strong> en productos! Envíos por Servientrega
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`https://wa.me/${SPONSOR_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-emerald-300 transition-colors flex items-center gap-1 font-bold"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>{SPONSOR_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                HGW
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white leading-tight tracking-tight">
                  HEALTH GREEN WORLD
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider">
                  MUNDO VERDE SALUDABLE · PANAMÁ
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <input
                id="search-input-desktop"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar arándanos, turmalina, cafés, colágeno..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Actions & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Price Mode Toggle Button */}
            <button
              id="btn-toggle-price-mode"
              onClick={() => onTogglePartnerMode(!isPartnerMode)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isPartnerMode
                  ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
              title="Alternar entre ver Precio Público y Precio Socio (-30%)"
            >
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isPartnerMode ? 'Vista: Precio Socio (-30%)' : 'Vista: Precio Público'}</span>
            </button>

            {/* Elegir Membresía CTA */}
            <button
              id="btn-nav-elegir-membresia"
              onClick={onOpenMemberships}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all active:scale-95"
            >
              <Award className="w-4 h-4" />
              <span>Elegir Membresía</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              id="btn-open-cart"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-colors flex items-center gap-2 border border-slate-200 dark:border-slate-700"
              aria-label="Ver Carrito de Compras"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-slate-400 leading-none font-bold">Carrito</span>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 leading-none">
                  {cartBV.toFixed(1)} BV
                </span>
              </div>

              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center shadow-md animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Abrir Menú"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              id="search-input-mobile"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar productos HGW..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 overflow-x-auto scrollbar-none flex items-center gap-1.5 sm:gap-2 pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
