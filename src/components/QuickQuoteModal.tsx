import React, { useState, useEffect } from 'react';
import { X, MessageCircle, MapPin, Building2, User, Phone, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { SPONSOR_INFO } from '../data/memberships';

interface QuickQuoteModalProps {
  product: Product | null;
  quantity?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({
  product,
  quantity = 1,
  isOpen,
  onClose,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'domicilio' | 'oficina'>('domicilio');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});

  useEffect(() => {
    if (isOpen) {
      setFormErrors({});
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const totalPublic = (product.pricePublic * quantity).toFixed(2);
  const totalPartner = (product.pricePartner * quantity).toFixed(2);
  const totalBV = (product.bv * quantity).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string } = {};

    if (!clientName.trim()) {
      errors.name = 'Por favor ingresa tu nombre completo.';
    }
    if (!clientPhone.trim() || clientPhone.replace(/[^0-9]/g, '').length < 7) {
      errors.phone = 'Por favor ingresa un número de teléfono o WhatsApp válido.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const phone = SPONSOR_INFO.whatsapp.replace(/[^0-9]/g, '');
    const deliveryText =
      deliveryMethod === 'domicilio'
        ? `Envío a domicilio${addressDetails.trim() ? ` (Dirección / Ciudad: ${addressDetails.trim()})` : ' en Panamá'}`
        : 'Retiro en almacén / oficina oficial HGW en Ciudad de Panamá';

    const message = `¡Hola ${SPONSOR_INFO.name}! 👋 Deseo cotizar y coordinar la compra del siguiente producto:

👤 *Cliente:* ${clientName.trim()}
📱 *Teléfono / WhatsApp:* ${clientPhone.trim()}
🛵 *Modalidad de Entrega:* ${deliveryText}

📦 *Producto:* ${product.name}
🔢 *Cantidad:* ${quantity} ${quantity === 1 ? 'unidad' : 'unidades'}
💵 *Precio Público:* B/. ${totalPublic} USD (${quantity > 1 ? `B/. ${product.pricePublic.toFixed(2)} c/u` : 'precio regular'})
🏷️ *Precio Socio (-30%):* B/. ${totalPartner} USD (${totalBV} BV)

¿Me podrías confirmar disponibilidad y coordinar la entrega? ¡Muchas gracias!`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      id="quick-quote-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="quick-quote-modal-container"
        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 px-5 py-4 border-b border-emerald-500/30 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-400 shrink-0">
              <MessageCircle className="w-5 h-5 fill-emerald-400/20" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 block">
                Cotización Rápida por WhatsApp
              </span>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                Datos de Entrega y Contacto
              </h3>
            </div>
          </div>
          <button
            id="btn-close-quick-quote-modal"
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Selected Product Summary Card */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-900 p-1 shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
              <img
                src={product.image || product.fallbackImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
                {product.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Cantidad: <strong className="text-slate-900 dark:text-white">{quantity} {quantity === 1 ? 'unidad' : 'unidades'}</strong>
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  Público: B/. {totalPublic}
                </span>
                <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3" /> Socio: B/. {totalPartner}
                </span>
              </div>
            </div>
          </div>

          {/* 1. Modalidad de Entrega (Domicilio o Retiro) */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
              ¿Cómo deseas recibir tu pedido? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                id="btn-delivery-domicilio"
                onClick={() => setDeliveryMethod('domicilio')}
                className={`p-3 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
                  deliveryMethod === 'domicilio'
                    ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <MapPin className={`w-5 h-5 ${deliveryMethod === 'domicilio' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                  {deliveryMethod === 'domicilio' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                </div>
                <div className="mt-2">
                  <div className="font-extrabold text-xs sm:text-sm">Envío a Domicilio</div>
                  <div className="text-[11px] opacity-75">A todo Panamá</div>
                </div>
              </button>

              <button
                type="button"
                id="btn-delivery-oficina"
                onClick={() => setDeliveryMethod('oficina')}
                className={`p-3 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
                  deliveryMethod === 'oficina'
                    ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Building2 className={`w-5 h-5 ${deliveryMethod === 'oficina' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                  {deliveryMethod === 'oficina' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                </div>
                <div className="mt-2">
                  <div className="font-extrabold text-xs sm:text-sm">Retiro en Almacén</div>
                  <div className="text-[11px] opacity-75">Oficina Central Panamá</div>
                </div>
              </button>
            </div>
          </div>

          {/* Optional address field if delivery */}
          {deliveryMethod === 'domicilio' && (
            <div className="space-y-1 animate-in fade-in duration-150">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Dirección / Ciudad o Provincia (Opcional):
              </label>
              <input
                type="text"
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                placeholder="Ej. San Francisco, Calle 50 / La Chorrera / David, Chiriquí"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}

          {/* 2. Nombre del Cliente */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
              Nombre Completo <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="Tu nombre y apellido"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  formErrors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
            </div>
            {formErrors.name && (
              <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {formErrors.name}
              </p>
            )}
          </div>

          {/* 3. Teléfono / WhatsApp */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
              Teléfono / WhatsApp de Contacto <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => {
                  setClientPhone(e.target.value);
                  if (formErrors.phone) setFormErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="Ej. +507 6123-4567"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  formErrors.phone ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
            </div>
            {formErrors.phone && (
              <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {formErrors.phone}
              </p>
            )}
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              id="btn-submit-quick-quote-whatsapp"
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] text-white font-black text-sm sm:text-base transition-all duration-200 shadow-lg shadow-green-600/25 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white/20 shrink-0" />
              <span>Continuar y Enviar Cotización por WhatsApp</span>
            </button>
            <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-2">
              Se abrirá WhatsApp directamente con Yamilka Batista (+507 6778-8375) y tu pedido listo para enviar.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
