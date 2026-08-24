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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="modal-registro-hgw-container"
        className="bg-slate-900 text-white w-full max-w-3xl rounded-2xl shadow-2xl border border-emerald-500/30 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 px-6 py-4 border-b border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Activación de Membresía Oficial HGW
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                {selectedPlan ? `Registro para ${selectedPlan.name}` : 'Tutorial de Registro y Afiliación HGW'}
              </h2>
            </div>
          </div>
          <button
            id="btn-close-registration-modal"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Selected Plan Summary Banner (if chosen) */}
          {selectedPlan && (
            <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-emerald-300 font-semibold uppercase">Membresía Seleccionada</span>
                <div className="text-base font-extrabold text-white">{selectedPlan.name}</div>
                <div className="text-xs text-slate-300">
                  Puntaje requerido: <strong className="text-emerald-400">{selectedPlan.bvRequired} BV</strong> | Inversión aprox: <strong className="text-white">{selectedPlan.approxInvestment}</strong>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg shadow-sm">
                  {selectedPlan.discountRecompra}
                </span>
              </div>
            </div>
          )}

          {/* YouTube Video Tutorial Frame */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-slate-200 flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                Video Tutorial: Cómo registrarte paso a paso en HGW
              </h3>
              <span className="text-xs text-slate-400 hidden sm:inline">Duración: 2 min</span>
            </div>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-black">
              <iframe
                id="iframe-video-tutorial-hgw"
                src={`https://www.youtube.com/embed/${SPONSOR_INFO.youtubeEmbedId}?autoplay=1&rel=0&modestbranding=1`}
                title="Tutorial de Registro HGW"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-xs text-slate-400 italic text-center">
              Revisa el tutorial anterior para completar tu registro de distribuidor en el portal oficial de Health Green World.
            </p>
          </div>

          {/* Sponsor Verification Box */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Datos de tu Patrocinador Oficial HGW Panamá
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Patrocinador / Asesor:</span>
                <strong className="text-white text-sm">{SPONSOR_INFO.name}</strong>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-emerald-500/40">
                <span className="text-emerald-400 block text-[11px] font-semibold">Código de Patrocinio:</span>
                <strong className="text-emerald-300 text-base font-mono tracking-wider">{SPONSOR_INFO.code}</strong>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">País de Registro:</span>
                <strong className="text-white text-sm flex items-center gap-1.5">
                  <span>🇵🇦</span> {SPONSOR_INFO.country}
                </strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
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
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Pasos rápidos para tu registro:</h4>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>1. Haz clic en el botón <strong>"Registrarse en HGW Oficial"</strong> abajo.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>2. Verifica que aparezca el usuario <strong>{SPONSOR_INFO.code}</strong> en la casilla de patrocinador.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>3. Completa tus datos personales, selecciona tu paquete inicial de BV y realiza tu activación.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>4. ¡Listo! Recibirás acceso 24/7 a la Oficina Virtual HGW y a la Academia Digital (<strong>academiahgw.online</strong>).</span>
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
              className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base transition-all duration-200 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-center"
            >
              <span>Registrarse Ahora en HGW</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              id="btn-modal-whatsapp-sponsor"
              href={`https://wa.me/${SPONSOR_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hola Yamilka, deseo registrarme en HGW Panamá con tu código ${SPONSOR_INFO.code}. ¿Podrías asesorarme con mi membresía?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-600 transition-colors flex items-center justify-center gap-2"
            >
              <span>Asistencia por WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
