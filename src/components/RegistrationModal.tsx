import React from 'react';
import { X, Play, ExternalLink, ShieldCheck, UserCheck, CheckCircle2, Phone, Mail, Award, ArrowRight } from 'lucide-react';
import { SPONSOR_INFO } from '../data/memberships';
import { MembershipPlan } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: MembershipPlan | null;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  selectedPlan
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-registro-hgw-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="modal-registro-hgw-container"
        className="bg-slate-900 text-white w-full max-w-3xl rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden relative my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 px-4 sm:px-6 py-3.5 border-b border-emerald-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 block">
                Activación de Membresía Oficial HGW
              </span>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                {selectedPlan ? `Registro para ${selectedPlan.name}` : 'Tutorial de Registro y Afiliación HGW'}
              </h2>
            </div>
          </div>
          <button
            id="btn-close-registration-modal"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-slate-800 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Selected Plan Summary Banner (if chosen) */}
          {selectedPlan && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">Membresía Seleccionada</span>
                <div className="text-lg font-black text-white">{selectedPlan.name}</div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Puntaje requerido: <strong className="text-emerald-400 font-black">{selectedPlan.bvRequired} BV</strong> · Inversión aprox: <strong className="text-white font-black">{selectedPlan.approxInvestment}</strong>
                </div>
              </div>
              <div>
                <span className="inline-block px-3 py-1.5 bg-emerald-500 text-slate-950 text-xs font-black rounded-xl shadow-sm">
                  {selectedPlan.discountRecompra}
                </span>
              </div>
            </div>
          )}

          {/* YouTube Video Tutorial Frame */}
          <div className="space-y-2">
            <div className="text-center space-y-1">
              <h3 className="text-sm sm:text-base font-black text-white flex items-center justify-center gap-2">
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400 shrink-0" />
                <span>Video Tutorial: Cómo registrarte paso a paso en HGW</span>
              </h3>
              <p className="text-xs text-slate-400">
                Sigue las instrucciones del video para afiliarte en la plataforma oficial con tu patrocinador.
              </p>
            </div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-black">
              <iframe
                id="iframe-video-tutorial-hgw"
                src={`https://www.youtube.com/embed/${SPONSOR_INFO.youtubeEmbedId}?autoplay=1&rel=0&modestbranding=1`}
                title="Tutorial de Registro HGW"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Sponsor Verification Box */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 space-y-3">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-black text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Datos de tu Patrocinador Oficial HGW Panamá
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border-2 border-emerald-500/50 shrink-0 shadow-md">
                <img
                  src={SPONSOR_INFO.image || 'https://lh3.googleusercontent.com/d/1KeOPcyuhctKp1qJsNsfw-nlUuXzyU_hf'}
                  alt={SPONSOR_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 w-full text-xs text-center sm:text-left">
                <div className="bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Patrocinador / Asesor:</span>
                  <strong className="text-white text-xs sm:text-sm font-black">{SPONSOR_INFO.name}</strong>
                </div>

                <div className="bg-slate-800/90 p-2.5 rounded-xl border border-emerald-500/40">
                  <span className="text-emerald-400 block text-[10px] font-black">Código de Patrocinio:</span>
                  <strong className="text-emerald-300 text-sm sm:text-base font-mono font-black tracking-wider">{SPONSOR_INFO.code}</strong>
                </div>

                <div className="bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">País de Registro:</span>
                  <strong className="text-white text-xs sm:text-sm font-black flex items-center justify-center sm:justify-start gap-1.5">
                    <span>🇵🇦</span> {SPONSOR_INFO.country}
                  </strong>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: <strong>{SPONSOR_INFO.phone}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Email: <strong>{SPONSOR_INFO.email}</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Step Guide */}
          <div className="space-y-2.5 bg-slate-950/60 p-3.5 sm:p-4 rounded-2xl border border-slate-800">
            <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider text-center sm:text-left">Pasos rápidos para tu registro:</h4>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>1. Haz clic en el botón <strong>"Registrarse Ahora en HGW"</strong> abajo.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>2. Verifica que aparezca el código <strong>{SPONSOR_INFO.code}</strong> en la casilla de patrocinador.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>3. Completa tus datos personales, selecciona tu paquete de activación y realiza el pago.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>4. Recibirás tu ID y acceso inmediato a la Oficina Virtual HGW y la Academia Digital (<strong>academiahgw.online</strong>).</span>
              </li>
            </ul>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              id="btn-modal-registrarse-oficial"
              href={SPONSOR_INFO.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm sm:text-base transition-all duration-200 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-center min-h-[44px]"
            >
              <span>Registrarse Ahora en HGW</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>

            <a
              id="btn-modal-whatsapp-sponsor"
              href={`https://wa.me/${SPONSOR_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hola Yamilka, deseo registrarme en HGW Panamá con tu código ${SPONSOR_INFO.code}. ¿Podrías asesorarme con mi membresía?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-600 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>Asistencia WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
