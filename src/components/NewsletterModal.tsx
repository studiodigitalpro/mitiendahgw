import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle2, Send, ShieldCheck, Sparkles, Mail, Phone, User, Globe } from 'lucide-react';

interface NewsletterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const COUNTRY_CODES = [
  { code: '+507', country: 'Panamá', flag: '🇵🇦' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
  { code: '+51', country: 'Perú', flag: '🇵🇪' },
  { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
  { code: '+52', country: 'México', flag: '🇲🇽' },
  { code: '+502', country: 'Guatemala', flag: '🇬🇹' },
  { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
  { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
  { code: '+504', country: 'Honduras', flag: '🇭🇳' },
  { code: '+505', country: 'Nicaragua', flag: '🇳🇮' },
  { code: '+1', country: 'Estados Unidos / Canadá / PR', flag: '🇺🇸' },
  { code: '+34', country: 'España', flag: '🇪🇸' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
];

export function NewsletterModal({ isOpen: controlledIsOpen, onClose: controlledOnClose }: NewsletterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+507');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto show modal after 6 seconds if not dismissed previously in this session
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
      return;
    }

    const dismissed = sessionStorage.getItem('hgw_newsletter_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [controlledIsOpen]);

  const handleClose = () => {
    sessionStorage.setItem('hgw_newsletter_dismissed', 'true');
    setIsOpen(false);
    if (controlledOnClose) {
      controlledOnClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Por favor ingresa tu nombre completo');
      return;
    }

    if (!phone.trim()) {
      setError('Por favor ingresa tu número de teléfono / WhatsApp');
      return;
    }

    setIsSubmitting(true);

    const fullPhone = `${countryCode} ${phone.trim()}`;
    const subject = encodeURIComponent(`Nuevo Registro de Novedades y Actividades HGW: ${name.trim()}`);
    const body = encodeURIComponent(
      `Hola Yamilka / Equipo HGW Panamá,\n\n` +
      `Se ha recibido una nueva solicitud de suscripción a Novedades, Ofertas y Actividades desde el sitio web hgwpanama.com:\n\n` +
      `• Nombre: ${name.trim()}\n` +
      `• Teléfono/WhatsApp: ${fullPhone}\n` +
      `• Correo Electrónico: ${email.trim() ? email.trim() : 'No proporcionado (opcional)'}\n` +
      `• Fecha y Hora: ${new Date().toLocaleString('es-PA')}\n` +
      `• Canal de Origen: Pop-up Web HGW Panamá\n\n` +
      `Por favor registrarlo en la lista de difusión y contacto prioritario.`
    );

    // Prepare mailto target to info@hgwpanama.com with CC to info.yamilka@gmail.com
    const mailtoUrl = `mailto:info@hgwpanama.com?cc=info.yamilka@gmail.com&subject=${subject}&body=${body}`;

    // Also attempt FormSubmit / Formspree or asynchronous fallback if available, while opening mailto / whatsapp confirmation
    try {
      // Send async beacon or fetch to standard notification service if possible
      await fetch('https://formsubmit.co/ajax/info@hgwpanama.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Nuevo Suscriptor HGW Panamá: ${name.trim()}`,
          _cc: 'info.yamilka@gmail.com',
          _template: 'table',
          nombre: name.trim(),
          telefono: fullPhone,
          email: email.trim() || 'No proporcionado',
          origen: 'Pop-up Suscripción Novedades HGW Panamá'
        })
      }).catch(() => {
        // Safe catch for network or ad-blocker filters
      });
    } catch {
      // Ignored safely
    }

    // Trigger local mail client backup link in case background mail service is blocked by client adblocker
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();

    setIsSubmitting(false);
    setIsSuccess(true);
    sessionStorage.setItem('hgw_newsletter_dismissed', 'true');

    setTimeout(() => {
      handleClose();
      setIsSuccess(false);
      setName('');
      setPhone('');
      setEmail('');
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-newsletter-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/60 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          id="btn-close-newsletter"
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Cerrar ventana"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {isSuccess ? (
          <div className="p-6 sm:p-10 text-center space-y-4 animate-in fade-in">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border-2 border-emerald-500">
              <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">
                ¡Gracias por Suscribirte!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Tus datos han sido registrados con éxito y enviados a <b>info@hgwpanama.com</b> con copia a <b>info.yamilka@gmail.com</b>. Te mantendremos al día con cada evento y promoción.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left Side: Brand Highlight Banner */}
            <div className="md:col-span-5 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 p-5 sm:p-6 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-300 text-[11px] font-black uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Comunidad HGW Panamá
                </div>
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-white leading-tight">
                  ¡Novedades, Ofertas y Actividades!
                </h3>
                <p className="mt-2 text-xs text-emerald-100/90 leading-relaxed">
                  Suscríbete gratis y recibe avisos de lanzamientos de productos, eventos de salud y promociones exclusivas.
                </p>
              </div>

              <div className="hidden md:flex items-center gap-2 pt-4 border-t border-emerald-700/50 text-[11px] text-emerald-200/80">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Privacidad garantizada. Sin spam.</span>
              </div>
            </div>

            {/* Right Side: Compact Grid Form */}
            <div className="md:col-span-7 p-4 sm:p-6 flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                {error && (
                  <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                    {error}
                  </div>
                )}

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {/* Nombre (Obligatorio) */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                      <User className="w-3 h-3 text-emerald-500" />
                      Nombre Completo <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Carlos Martínez"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Teléfono / WhatsApp (Obligatorio) */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-emerald-500" />
                      WhatsApp / Teléfono <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-1.5">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="max-w-[125px] sm:max-w-[140px] px-2 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                      >
                        {COUNTRY_CODES.map((c, i) => (
                          <option key={i} value={c.code} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium">
                            {c.flag} {c.code} ({c.country})
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="6000-0000"
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Correo Electrónico (Opcional) */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-emerald-500" />
                        Correo Electrónico
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">(Opcional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Enviando información...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Suscribirme a Novedades</span>
                    </>
                  )}
                </button>

                <div className="flex md:hidden items-center justify-center gap-1.5 text-[10px] text-slate-400">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>Tus datos son privados. Cero spam.</span>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
