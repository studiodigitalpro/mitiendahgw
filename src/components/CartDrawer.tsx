import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  Send,
  Truck,
  Building,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Package,
  User,
  Phone,
  MapPin,
  FileText,
  Search,
  Plus,
  Check,
  Mail,
  MessageCircle,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { CartItem, Product } from '../types';
import { SPONSOR_INFO } from '../data/memberships';
import { PRODUCTS } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string | number, quantity: number) => void;
  onRemoveItem: (productId: string | number) => void;
  onClearCart: () => void;
  onOpenMemberships: () => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenMemberships,
  onAddToCart
}) => {
  const [currentStep, setCurrentStep] = useState<'products' | 'checkout' | 'success'>('products');
  const [deliveryMethod, setDeliveryMethod] = useState<'domicilio' | 'oficina'>('domicilio');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; email?: string; address?: string }>({});

  // Additional products browser inside cart
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedFeedbackId, setAddedFeedbackId] = useState<string | number | null>(null);

  // Reset to Step 1 whenever cart opens
  useEffect(() => {
    if (isOpen) {
      if (currentStep === 'success') {
        // Keep as is or reset if empty
        if (items.length === 0) setCurrentStep('products');
      } else {
        setCurrentStep('products');
      }
    }
  }, [isOpen, items.length]);

  // Pricing calculations
  const BASE_SHIPPING_COST = 5.00;
  const shippingCost = deliveryMethod === 'domicilio' ? BASE_SHIPPING_COST : 0;

  const totalBV = items.reduce((acc, item) => acc + item.product.bv * item.quantity, 0);
  const publicSubtotal = items.reduce((acc, item) => acc + item.product.pricePublic * item.quantity, 0);
  const isPartnerEligible = totalBV >= 50;

  const partnerSubtotal = items.reduce((acc, item) => acc + item.product.pricePartner * item.quantity, 0);
  const productsSubtotal = isPartnerEligible ? partnerSubtotal : publicSubtotal;
  const finalTotal = productsSubtotal + shippingCost;
  const totalSavings = isPartnerEligible ? publicSubtotal - partnerSubtotal : 0;
  const bvShortage = Math.max(0, Number((50 - totalBV).toFixed(1)));
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Filter available products to add from cart
  const filteredAvailableProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(productSearch.toLowerCase()) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(productSearch.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [productSearch, selectedCategory]);

  const handleAddProductFromCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product, 1);
    } else {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        onUpdateQuantity(product.id, existing.quantity + 1);
      }
    }
    setAddedFeedbackId(product.id);
    setTimeout(() => {
      setAddedFeedbackId(null);
    }, 1200);
  };

  const handleGoToCheckout = () => {
    if (items.length === 0) return;
    setCurrentStep('checkout');
  };

  const handleCheckoutWhatsApp = async () => {
    if (items.length === 0) return;

    // Basic validation for step 2
    const errors: { name?: string; phone?: string; email?: string; address?: string } = {};
    if (!clientName.trim()) {
      errors.name = 'Por favor escribe tu nombre y apellido.';
    }
    if (!clientPhone.trim()) {
      errors.phone = 'Por favor ingresa tu número de WhatsApp o teléfono.';
    }
    if (clientEmail.trim() && !clientEmail.includes('@')) {
      errors.email = 'Por favor ingresa un correo electrónico válido.';
    }
    if (deliveryMethod === 'domicilio' && !clientAddress.trim()) {
      errors.address = 'Por favor ingresa tu dirección en Panamá.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    let message = `🛒 *COTIZACIÓN DE PEDIDO HGW PANAMÁ*\n`;
    message += `👤 *Cliente:* ${clientName.trim()}\n`;
    message += `📱 *Teléfono / WhatsApp:* ${clientPhone.trim()}\n`;
    if (clientEmail.trim()) {
      message += `✉️ *Correo Electrónico:* ${clientEmail.trim()}\n`;
    }
    message += `📍 *Modalidad de Entrega:* ${
      deliveryMethod === 'domicilio'
        ? 'A Domicilio (Servientrega Panamá)'
        : 'Retiro en Oficina Panamá'
    }\n`;

    if (deliveryMethod === 'domicilio' && clientAddress.trim()) {
      message += `🏠 *Dirección de Entrega:* ${clientAddress.trim()}\n`;
    }

    message += `🏷️ *Tipo de Precio:* ${
      isPartnerEligible
        ? '💎 PRECIO SOCIO MAYORISTA (-30% DESCUENTO DESBLOQUEADO)'
        : '🏷️ PRECIO PÚBLICO'
    }\n\n`;

    message += `📦 *PRODUCTOS COTIZADOS:*\n`;
    items.forEach((item, index) => {
      const unitPrice = isPartnerEligible ? item.product.pricePartner : item.product.pricePublic;
      const sub = unitPrice * item.quantity;
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   - Cantidad: ${item.quantity} und | Unitario: B/. ${unitPrice.toFixed(2)} | Subtotal: B/. ${sub.toFixed(2)} | BV: ${(item.product.bv * item.quantity).toFixed(1)} pts\n`;
    });

    message += `\n📊 *RESUMEN DE COTIZACIÓN:*\n`;
    message += `• *Total BV Acumulados:* ${totalBV.toFixed(1)} BV\n`;
    message += `• *Subtotal Productos:* B/. ${publicSubtotal.toFixed(2)}\n`;

    if (isPartnerEligible) {
      message += `• *Ahorro Descuento Socio (30%):* -B/. ${totalSavings.toFixed(2)}\n`;
      message += `• *Subtotal con Descuento:* B/. ${partnerSubtotal.toFixed(2)}\n`;
    }

    if (deliveryMethod === 'domicilio') {
      message += `• *Costo de Envío:* B/. ${BASE_SHIPPING_COST.toFixed(2)} *(tarifa base Servientrega)*\n`;
    } else {
      message += `• *Costo de Envío:* B/. 0.00 (Retiro en oficina)\n`;
    }

    message += `• *TOTAL A PAGAR:* *B/. ${finalTotal.toFixed(2)} (USD)*\n`;

    if (isPartnerEligible) {
      message += `✨ *Calificación de Membresía:* Desbloqueado para activación como Socio HGW.\n`;
    } else {
      message += `ℹ️ *Nota:* Con ${bvShortage} BV adicionales desbloqueas 30% de descuento socio.\n`;
    }

    if (orderNotes.trim()) {
      message += `\n📝 *Notas adicionales:* ${orderNotes.trim()}\n`;
    }

    message += `\n🤝 *Distribuidora Asignada:* ${SPONSOR_INFO.name} (Código: ${SPONSOR_INFO.code})\n`;
    message += `🌐 *Tienda Web:* https://hgwpanamacity.com/`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SPONSOR_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encoded}`;
    setLastWhatsAppUrl(whatsappUrl);

    // Send payload to backend server for email notification to info@hgwpanama.com with CC to info.yamilka@gmail.com and yamilkabatista2026@gmail.com
    try {
      await fetch('/api/send-quotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName.trim(),
          clientPhone: clientPhone.trim(),
          clientEmail: clientEmail.trim() || undefined,
          clientAddress: deliveryMethod === 'domicilio' ? clientAddress.trim() : '',
          deliveryMethod,
          orderNotes: orderNotes.trim(),
          items,
          totalBV,
          publicSubtotal,
          partnerSubtotal,
          shippingCost,
          finalTotal,
          isPartnerEligible,
          totalSavings,
        }),
      });
    } catch (e) {
      console.warn('Notice on quotation submission API:', e);
    } finally {
      setIsSubmitting(false);
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      // Transition to success screen
      setCurrentStep('success');
    }
  };

  const handleResetForNewQuotation = () => {
    onClearCart();
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setClientAddress('');
    setOrderNotes('');
    setCurrentStep('products');
  };

  if (!isOpen) return null;

  return (
    <div
      id="cart-screen-overlay"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        id="cart-screen-modal"
        className="w-full h-full sm:h-auto sm:max-h-[94vh] max-w-5xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-4 sm:px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-600/15 text-emerald-600 dark:text-emerald-400">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white leading-tight">
                {currentStep === 'success'
                  ? 'Cotización Confirmada'
                  : currentStep === 'checkout'
                  ? 'Finalizar Cotización'
                  : 'Cotización de Productos HGW'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {currentStep === 'success'
                  ? 'Notificación enviada a Yamilka Batista (+507 6778-8375)'
                  : items.length === 0
                  ? 'Tu carrito está vacío'
                  : `${totalItemsCount} ${totalItemsCount === 1 ? 'unidad' : 'unidades'} (${items.length} ${items.length === 1 ? 'producto' : 'productos'})`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && currentStep === 'products' && (
              <button
                id="btn-clear-cart"
                onClick={onClearCart}
                className="text-xs font-bold text-rose-500 hover:text-rose-600 px-3 py-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              >
                Vaciar
              </button>
            )}
            <button
              id="btn-close-cart"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
              aria-label="Cerrar ventana de cotización"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Step Flow Indicator */}
        {items.length > 0 && (
          <div className="px-4 sm:px-6 py-2.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-2 text-xs font-bold">
            <div className="flex items-center gap-2 sm:gap-4 flex-1">
              {/* Step 1 Pill */}
              <button
                type="button"
                onClick={() => setCurrentStep('products')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${
                  currentStep === 'products'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200 dark:border-slate-700 font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black ${
                  currentStep === 'products' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  1
                </span>
                <span className="truncate">Resumen de Cotización</span>
              </button>

              <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

              {/* Step 2 Pill */}
              <button
                type="button"
                onClick={() => handleGoToCheckout()}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${
                  currentStep === 'checkout'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200 dark:border-slate-700 font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black ${
                  currentStep === 'checkout' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  2
                </span>
                <span className="truncate">Datos de Envío & WhatsApp</span>
              </button>
            </div>

            {/* Quick BV Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 font-black text-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{totalBV.toFixed(1)} BV</span>
            </div>
          </div>
        )}

        {/* BV Progress Banner */}
        {items.length > 0 && (
          <div className="px-4 sm:px-6 py-3 bg-slate-900 text-white border-b border-slate-800 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Puntos de la Orden:
              </span>
              <span className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono">
                {totalBV.toFixed(1)} BV
              </span>
            </div>

            {isPartnerEligible ? (
              <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ¡30% Descuento de Socio HGW Desbloqueado!
                </span>
                <span className="text-white font-extrabold">Ahorras B/. {totalSavings.toFixed(2)}</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Meta para Descuento de Socio (50 BV)</span>
                  <span className="font-bold text-emerald-300">Faltan {bvShortage} BV</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (totalBV / 50) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-300 leading-tight">
                  💡 Agrega <strong className="text-emerald-400 font-bold">{bvShortage} BV</strong> más y obtendrás automáticamente un 30% de descuento en toda tu compra.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modal Body Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {items.length === 0 ? (
            /* Empty State */
            <div className="py-16 sm:py-24 text-center space-y-4 max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-400 shadow-inner">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">No tienes productos en cotización</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Selecciona los productos de nuestro catálogo oficial en Panamá para generar tu cotización detallada.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Ver Catálogo de Productos
              </button>
            </div>
          ) : currentStep === 'products' ? (
            /* STEP 1: RESUMEN DE COTIZACIÓN DE PRODUCTOS Y SECCIÓN PARA AÑADIR OTROS PRODUCTOS */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Product List & Quick Add (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                {/* 1. Current Cart Items */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <Package className="w-4 h-4 text-emerald-600" />
                      <span>Productos en Cotización ({items.length})</span>
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Modifica cantidades o añade más
                    </span>
                  </div>

                  <div className="space-y-3">
                    {items.map((item) => {
                      const unitPrice = isPartnerEligible ? item.product.pricePartner : item.product.pricePublic;
                      const subtotal = unitPrice * item.quantity;

                      return (
                        <div
                          key={item.product.id}
                          className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 hover:border-emerald-500/40 transition-colors"
                        >
                          <div className="flex items-center gap-3.5 w-full sm:w-auto">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white dark:bg-slate-900 p-1.5 shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden shadow-xs">
                              <img
                                src={item.product.image || item.product.fallbackImage}
                                alt={item.product.name}
                                referrerPolicy="no-referrer"
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5">
                                {item.product.categoryLabel}
                              </span>
                              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                                {item.product.name}
                              </h4>
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs">
                                <span className="text-slate-600 dark:text-slate-300 font-bold">
                                  Público: <span className={isPartnerEligible ? 'line-through text-slate-400 font-normal' : 'text-slate-900 dark:text-white font-black'}>B/. {item.product.pricePublic.toFixed(2)}</span>
                                </span>
                                {isPartnerEligible ? (
                                  <span className="text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    Socio: B/. {item.product.pricePartner.toFixed(2)}
                                  </span>
                                ) : (
                                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                                    (Socio: B/. {item.product.pricePartner.toFixed(2)})
                                  </span>
                                )}
                                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-black">
                                  {(item.product.bv * item.quantity).toFixed(1)} BV
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Quantity & Item Subtotal Controls */}
                          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-700">
                            <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-2xs">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-black transition-colors cursor-pointer"
                                aria-label="Restar una unidad"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-sm font-black text-slate-900 dark:text-white min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-black transition-colors cursor-pointer"
                                aria-label="Añadir una unidad"
                              >
                                +
                              </button>
                            </div>

                            <div className="text-right">
                              <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white block font-mono">
                                B/. {subtotal.toFixed(2)}
                              </span>
                              <button
                                type="button"
                                onClick={() => onRemoveItem(item.product.id)}
                                className="text-[11px] text-slate-400 hover:text-rose-500 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer mt-0.5"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Eliminar</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Añadir otros productos directamente en el carrito */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700/80 space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                        <Plus className="w-4 h-4 text-emerald-600" />
                        <span>Añadir Otros Productos a la Cotización</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Agrega más productos de HGW Panamá sin salir del carrito
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        const el = document.getElementById('catalog');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ver catálogo en la tienda</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Search and Category Filter for Quick Adding */}
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        placeholder="Buscar producto por nombre (ej. Café, Arándano, Pasta...)"
                        className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      {productSearch && (
                        <button
                          onClick={() => setProductSearch('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Category Selector */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                      {[
                        { id: 'all', label: 'Todos' },
                        { id: 'salud', label: 'Salud' },
                        { id: 'cafe-te', label: 'Café & Té' },
                        { id: 'cuidado-personal', label: 'Cuidado Personal' },
                        { id: 'turmalina', label: 'Turmalina' }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            selectedCategory === cat.id
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Available Products Grid (Compact & Clickable) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                    {filteredAvailableProducts.slice(0, 10).map((prod) => {
                      const inCartItem = items.find((i) => i.product.id === prod.id);
                      const isJustAdded = addedFeedbackId === prod.id;

                      return (
                        <div
                          key={prod.id}
                          className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 flex items-center justify-between gap-2.5 hover:border-emerald-500/50 hover:shadow-xs transition-all"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <div className="w-12 h-12 rounded-lg bg-slate-50 dark:bg-slate-900 p-1 shrink-0 border border-slate-100 dark:border-slate-700/50 flex items-center justify-center">
                              <img
                                src={prod.image || prod.fallbackImage}
                                alt={prod.name}
                                referrerPolicy="no-referrer"
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                {prod.name}
                              </h5>
                              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                                <span className="font-extrabold text-slate-900 dark:text-white">
                                  B/. {isPartnerEligible ? prod.pricePartner.toFixed(2) : prod.pricePublic.toFixed(2)}
                                </span>
                                <span className="px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                                  {prod.bv.toFixed(1)} BV
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddProductFromCart(prod)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                              isJustAdded
                                ? 'bg-teal-600 text-white'
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                            }`}
                            aria-label={`Añadir ${prod.name} a la cotización`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>¡Listo!</span>
                              </>
                            ) : inCartItem ? (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>+1 ({inCartItem.quantity})</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Añadir</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Summary & Next Step Action (4 cols) */}
              <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 sticky top-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 pb-2 border-b border-slate-200 dark:border-slate-700">
                  Resumen de la Cotización
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Subtotal Productos ({totalItemsCount} und):</span>
                    <span className="font-mono font-bold">B/. {publicSubtotal.toFixed(2)}</span>
                  </div>

                  {isPartnerEligible && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Descuento Socio (-30%):</span>
                      <span className="font-mono">-B/. {totalSavings.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Puntos Totales (BV):</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{totalBV.toFixed(1)} BV</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    <span>Subtotal Estimado:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                      B/. {productsSubtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  id="btn-cart-continue-step2"
                  type="button"
                  onClick={handleGoToCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-black text-sm transition-all duration-200 shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continuar a Datos de Entrega</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>En el siguiente paso podrás confirmar tu dirección y enviar tu pedido a WhatsApp.</span>
                </div>
              </div>
            </div>
          ) : currentStep === 'checkout' ? (
            /* STEP 2: FORMULARIO EN GRID DE 2 COLUMNAS (Optimizado para no ocupar mucho espacio y 100% responsivo) */
            <div className="max-w-3xl mx-auto space-y-5 animate-in fade-in-50 duration-200">
              {/* Back to Step 1 Button */}
              <button
                type="button"
                onClick={() => setCurrentStep('products')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Volver a modificar productos de la cotización</span>
              </button>

              {/* 1. Modalidad de Entrega (Grid 2 Columnas) */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>1. Modalidad de Entrega en Panamá</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('domicilio')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      deliveryMethod === 'domicilio'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-900 dark:text-emerald-200'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                        <Truck className="w-4 h-4 text-emerald-600" />
                        <span>A Domicilio (Servientrega)</span>
                      </div>
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">+B/. 5.00</span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      Envíos a todo Panamá (tarifa base estimada).
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('oficina')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      deliveryMethod === 'oficina'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-900 dark:text-emerald-200'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                        <Building className="w-4 h-4 text-emerald-600" />
                        <span>Retiro en Oficina Panamá</span>
                      </div>
                      <span className="text-xs font-black text-slate-500 font-mono">Gratis</span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      Retiro directo en oficina autorizada HGW.
                    </span>
                  </button>
                </div>
              </div>

              {/* 2. Customer Contact Form en GRID DE 2 COLUMNAS */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    <span>2. Datos de Contacto y Envío</span>
                  </h3>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Notificaciones a <strong className="text-emerald-700 dark:text-emerald-400">info@hgwpanama.com</strong>
                  </span>
                </div>

                {/* GRID 2 COLUMNAS (1 col en móvil, 2 col en tablet/desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 text-xs sm:text-sm">
                  {/* Columna 1: Nombre */}
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-bold">
                      Nombre y Apellido *
                    </label>
                    <input
                      id="input-client-name"
                      type="text"
                      value={clientName}
                      onChange={(e) => {
                        setClientName(e.target.value);
                        if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                      }}
                      placeholder="Ej. María Elena Pérez"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {formErrors.name && (
                      <p className="text-rose-500 text-xs font-semibold mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Columna 2: Teléfono / WhatsApp */}
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-bold">
                      WhatsApp / Teléfono de Contacto *
                    </label>
                    <input
                      id="input-client-phone"
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => {
                        setClientPhone(e.target.value);
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                      }}
                      placeholder="Ej. +507 6123-4567"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {formErrors.phone && (
                      <p className="text-rose-500 text-xs font-semibold mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Correo Electrónico (para confirmación digital) */}
                  <div className={deliveryMethod === 'domicilio' ? 'md:col-span-1' : 'md:col-span-1'}>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Correo Electrónico (Opcional)</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-normal">
                        Para recibir comprobante
                      </span>
                    </label>
                    <input
                      id="input-client-email"
                      type="email"
                      value={clientEmail}
                      onChange={(e) => {
                        setClientEmail(e.target.value);
                        if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                      }}
                      placeholder="tunombre@ejemplo.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {formErrors.email && (
                      <p className="text-rose-500 text-xs font-semibold mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Notas o Indicaciones si retiro en oficina, o Dirección si domicilio */}
                  {deliveryMethod === 'domicilio' ? (
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 mb-1 font-bold flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Dirección de Entrega en Panamá *</span>
                      </label>
                      <input
                        id="input-client-address"
                        type="text"
                        value={clientAddress}
                        onChange={(e) => {
                          setClientAddress(e.target.value);
                          if (formErrors.address) setFormErrors({ ...formErrors, address: undefined });
                        }}
                        placeholder="Provincia, Ciudad, Barriada, Calle o Edificio..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      {formErrors.address && (
                        <p className="text-rose-500 text-xs font-semibold mt-1">{formErrors.address}</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 mb-1 font-bold flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Notas o Indicaciones (Opcional)</span>
                      </label>
                      <input
                        id="input-client-notes"
                        type="text"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Horario preferido, persona que retira..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  )}

                  {deliveryMethod === 'domicilio' && (
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 dark:text-slate-300 mb-1 font-bold flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Notas o Referencia de Entrega (Opcional)</span>
                      </label>
                      <input
                        id="input-client-notes-extra"
                        type="text"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Color de casa, garita, punto de referencia o contacto adicional..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Final Totals Breakdown & Action */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <div className="flex justify-between sm:justify-start sm:gap-4 text-slate-600 dark:text-slate-400">
                      <span>Subtotal ({totalItemsCount} und):</span>
                      <span className="font-mono font-bold">B/. {publicSubtotal.toFixed(2)}</span>
                    </div>

                    {isPartnerEligible && (
                      <div className="flex justify-between sm:justify-start sm:gap-4 text-emerald-600 dark:text-emerald-400 font-bold">
                        <span>Descuento Socio (-30%):</span>
                        <span className="font-mono">-B/. {totalSavings.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between sm:justify-start sm:gap-4 text-slate-600 dark:text-slate-300">
                      <span>Costo de Envío:</span>
                      <span className="font-mono font-bold">
                        {deliveryMethod === 'domicilio' ? `B/. ${BASE_SHIPPING_COST.toFixed(2)}` : 'B/. 0.00 (Gratis)'}
                      </span>
                    </div>

                    <div className="flex justify-between sm:justify-start sm:gap-4 text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      <span>Total a Pagar:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                        B/. {finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  id="btn-checkout-whatsapp"
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleCheckoutWhatsApp}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed text-white font-black text-base sm:text-lg transition-all duration-200 shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Enviando cotización y notificando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Enviar Cotización por WhatsApp & Correo</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1 text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>
                    Atención directa con <strong>{SPONSOR_INFO.name}</strong> ({SPONSOR_INFO.code}) · WhatsApp: <strong>+507 6778-8375</strong>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* STEP 3: SUCCESS CONFIRMATION SCREEN */
            <div className="max-w-2xl mx-auto py-4 px-2 space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-600/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  ¡Cotización Enviada con Éxito!
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                  ¡Hola <strong>{clientName || 'Cliente'}</strong>! Muchas gracias por tu interés en los productos HGW. Soy <strong>{SPONSOR_INFO.name}</strong> (+507 6778-8375) y he recibido tu cotización.
                </p>
              </div>

              {/* Notification Badges Summary */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-left space-y-3 text-xs sm:text-sm">
                <h4 className="font-extrabold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center justify-between">
                  <span>📬 Resumen de Notificaciones Enviadas:</span>
                  <span className="text-[11px] font-mono text-emerald-600 font-bold">Total: B/. {finalTotal.toFixed(2)}</span>
                </h4>

                <div className="space-y-2 text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Correo Principal:</span>{' '}
                      <code className="text-emerald-600 dark:text-emerald-400 font-mono">info@hgwpanama.com</code>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Con Copia (CC):</span>{' '}
                      <span className="font-mono text-[11px]">info.yamilka@gmail.com, yamilkabatista2026@gmail.com</span>
                    </div>
                  </div>

                  {clientEmail && (
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Confirmación al Cliente por Correo:</span>{' '}
                        <code className="text-emerald-600 dark:text-emerald-400 font-mono">{clientEmail}</code>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2.5">
                    <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">WhatsApp Remitente & Asesor:</span>{' '}
                      <strong>+507 6778-8375 (Yamilka Batista)</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {lastWhatsAppUrl && (
                  <a
                    href={lastWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] text-white font-black text-sm sm:text-base transition-all duration-200 shadow-lg shadow-green-600/20 flex items-center justify-center gap-2.5"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Abrir Chat con Yamilka en WhatsApp (+507 6778-8375)</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleResetForNewQuotation}
                    className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Nueva Cotización
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Cerrar y Seguir Explorando
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
