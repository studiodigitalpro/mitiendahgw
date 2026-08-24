import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Send, Truck, Building, Sparkles, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { SPONSOR_INFO } from '../data/memberships';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string | number, quantity: number) => void;
  onRemoveItem: (productId: string | number) => void;
  onClearCart: () => void;
  onOpenMemberships: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenMemberships
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'domicilio' | 'oficina'>('domicilio');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientType, setClientType] = useState<'cliente' | 'socio'>('cliente');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  // Compute total BV and public subtotal
  const totalBV = items.reduce((acc, item) => acc + item.product.bv * item.quantity, 0);
  const publicSubtotal = items.reduce((acc, item) => acc + item.product.pricePublic * item.quantity, 0);
  const isPartnerEligible = totalBV >= 50;

  // Partner subtotal if eligible
  const partnerSubtotal = items.reduce((acc, item) => acc + item.product.pricePartner * item.quantity, 0);
  const finalTotal = isPartnerEligible ? partnerSubtotal : publicSubtotal;
  const totalSavings = isPartnerEligible ? publicSubtotal - partnerSubtotal : 0;
  const bvShortage = Math.max(0, Number((50 - totalBV).toFixed(1)));

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    let message = `🛒 *NUEVO PEDIDO HGW PANAMÁ*\n`;
    message += `👤 *Cliente:* ${clientName.trim() || 'No especificado'}\n`;
    message += `📱 *Teléfono:* ${clientPhone.trim() || 'No especificado'}\n`;
    message += `📍 *Modalidad de Entrega:* ${
      deliveryMethod === 'domicilio' ? 'A Domicilio (Servientrega Panamá)' : 'Retiro en Oficina Panamá'
    }\n`;

    if (deliveryMethod === 'domicilio' && clientAddress.trim()) {
      message += `🏠 *Dirección de Entrega:* ${clientAddress.trim()}\n`;
    }

    message += `🏷️ *Tipo de Pedido:* ${
      isPartnerEligible
        ? '💎 PRECIO SOCIO MAYORISTA (30% DESCUENTO APLICADO)'
        : '🏷️ PRECIO PÚBLICO'
    }\n\n`;

    message += `📦 *DETALLE DE PRODUCTOS:*\n`;
    items.forEach((item, index) => {
      const unitPrice = isPartnerEligible ? item.product.pricePartner : item.product.pricePublic;
      const sub = unitPrice * item.quantity;
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   - Cantidad: ${item.quantity} und | Unitario: $${unitPrice.toFixed(2)} | Subtotal: $${sub.toFixed(2)} | BV: ${(item.product.bv * item.quantity).toFixed(1)} pts\n`;
    });

    message += `\n📊 *RESUMEN DE ORDEN:*\n`;
    message += `• *Total BV Acumulados:* ${totalBV.toFixed(1)} BV\n`;
    message += `• *Subtotal Precio Público:* $${publicSubtotal.toFixed(2)} USD\n`;

    if (isPartnerEligible) {
      message += `• *Ahorro Descuento Socio (30%):* -$${totalSavings.toFixed(2)} USD\n`;
      message += `• *TOTAL A PAGAR (Socio):* *$${finalTotal.toFixed(2)} USD*\n`;
      message += `✨ *Calificación de Membresía:* Desbloqueado para activación como Socio HGW.\n`;
    } else {
      message += `• *TOTAL A PAGAR:* *$${finalTotal.toFixed(2)} USD*\n`;
      message += `ℹ️ *Nota:* Con ${bvShortage} BV adicionales desbloqueas 30% de descuento socio.\n`;
    }

    if (orderNotes.trim()) {
      message += `\n📝 *Notas adicionales:* ${orderNotes.trim()}\n`;
    }

    message += `\n🤝 *Código de Patrocinador Asignado:* ${SPONSOR_INFO.code} (${SPONSOR_INFO.name})`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SPONSOR_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        id="cart-drawer-content"
        className="w-full max-w-xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 border-l border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-slate-900 dark:text-white leading-tight">
                Tu Carrito HGW
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {items.length} {items.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                id="btn-clear-cart"
                onClick={onClearCart}
                className="text-xs text-rose-500 hover:text-rose-600 font-medium px-2 py-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                Vaciar
              </button>
            )}
            <button
              id="btn-close-cart"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BV Status Banner inside Cart */}
        <div className="p-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Puntos Acumulados:
            </span>
            <span className="text-base font-extrabold text-emerald-400 font-mono">
              {totalBV.toFixed(1)} BV
            </span>
          </div>

          {isPartnerEligible ? (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ¡30% Descuento de Socio Activado!
              </span>
              <span className="text-white font-extrabold">Ahorras ${totalSavings.toFixed(2)}</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Meta para Precio Socio (50 BV)</span>
                <span>Faltan {bvShortage} BV</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (totalBV / 50) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                💡 Agrega <strong className="text-emerald-400 font-bold">{bvShortage} BV</strong> más y obtendrás automáticamente un 30% de descuento en toda tu orden.
              </p>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold text-slate-700 dark:text-slate-200">Tu carrito está vacío</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Explora nuestro catálogo de productos con extractos de arándanos, turmalina y cafés saludables.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Comenzar a Comprar
              </button>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice = isPartnerEligible ? item.product.pricePartner : item.product.pricePublic;
              const subtotal = unitPrice * item.quantity;

              return (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center gap-3.5"
                >
                  <div className="w-16 h-16 rounded-lg bg-white dark:bg-slate-900 p-1 shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs">
                      <span className="text-slate-600 dark:text-slate-300 font-bold">
                        Público: <span className={isPartnerEligible ? 'line-through text-slate-400 font-normal' : 'text-slate-900 dark:text-white font-extrabold'}>${item.product.pricePublic.toFixed(2)}</span>
                      </span>
                      {isPartnerEligible ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Socio: ${item.product.pricePartner.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                          (Socio: ${item.product.pricePartner.toFixed(2)})
                        </span>
                      )}
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                        {(item.product.bv * item.quantity).toFixed(1)} BV
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                          ${subtotal.toFixed(2)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Delivery & Customer Checkout Form */}
          {items.length > 0 && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                1. Modalidad de Entrega en Panamá
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('domicilio')}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                    deliveryMethod === 'domicilio'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>A Domicilio</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Servientrega en todo Panamá (costo según peso)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('oficina')}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                    deliveryMethod === 'oficina'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <Building className="w-4 h-4 text-emerald-600" />
                    <span>Retiro en Oficina</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Oficina HGW Panamá para miembros
                  </span>
                </button>
              </div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 pt-2">
                2. Datos de Contacto
              </h3>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Nombre y Apellido *</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. María Pérez"
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">WhatsApp / Teléfono *</label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Ej. +507 6123-4567"
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {deliveryMethod === 'domicilio' && (
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Dirección / Ciudad en Panamá *</label>
                    <input
                      type="text"
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      placeholder="Ciudad, Provincia, Corregimiento, Referencia"
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Notas adicionales (opcional)</label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Horario preferido, instrucciones, etc."
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout CTA */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Subtotal ({items.length} productos):</span>
                <span>${publicSubtotal.toFixed(2)} USD</span>
              </div>

              {isPartnerEligible && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Descuento Socio (-30%):</span>
                  <span>-${totalSavings.toFixed(2)} USD</span>
                </div>
              )}

              <div className="flex justify-between text-base sm:text-lg font-extrabold text-slate-900 dark:text-white pt-1 border-t border-slate-200 dark:border-slate-800">
                <span>Total a Pagar:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">${finalTotal.toFixed(2)} USD</span>
              </div>
            </div>

            <button
              id="btn-checkout-whatsapp"
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base transition-all duration-200 shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Completar Pedido por WhatsApp</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Atendido directamente por <strong>{SPONSOR_INFO.name}</strong> ({SPONSOR_INFO.code})</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
