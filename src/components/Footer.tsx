import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Award, Globe, Heart } from 'lucide-react';
import { SPONSOR_INFO } from '../data/memberships';
import { COMPANY_INFO } from '../data/companyInfo';

interface FooterProps {
  onOpenMemberships: () => void;
  onOpenRegisterModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenMemberships,
  onOpenRegisterModal
}) => {
  return (
    <footer id="footer-hgw" className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-12 pb-8 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-lg shadow-md">
                HGW
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-base leading-none">HEALTH GREEN WORLD</span>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wider">PANAMÁ · MUNDO VERDE</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Más de 31 años de biotecnología nutracéutica en más de 69 países. Cuidando tu salud y transformando tu economía con el Plan de Ganancia Mutua 50/50.
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-slate-300">
              <span className="text-[11px] text-slate-400 block font-semibold">Academia Digital HGW 24/7:</span>
              <a
                href="https://academiahgw.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline font-bold flex items-center gap-1"
              >
                <span>academiahgw.online</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Contact & Sponsor */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Asesor & Patrocinador Oficial
            </h4>

            <div className="space-y-2 text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-white font-bold text-sm">{SPONSOR_INFO.name}</div>
                <div className="text-[11px] text-emerald-400 font-mono">Código: {SPONSOR_INFO.code}</div>
                <div className="text-[11px] text-slate-400">{SPONSOR_INFO.role}</div>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`https://wa.me/${SPONSOR_INFO.whatsapp.replace(/[^0-9]/g, '')}`} className="hover:text-white">
                  {SPONSOR_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${SPONSOR_INFO.email}`} className="hover:text-white">
                  {SPONSOR_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Panamá · Envíos a todo el país por Servientrega</span>
              </div>
            </div>
          </div>

          {/* Quick Links & Memberships */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Membresías & Ganancia
            </h4>

            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={onOpenMemberships} className="hover:text-emerald-400 transition-colors">
                  • Prejunior (50 BV) - Inversión $89-$100
                </button>
              </li>
              <li>
                <button onClick={onOpenMemberships} className="hover:text-emerald-400 transition-colors">
                  • Junior (100 BV) - Bono Equipo 7%
                </button>
              </li>
              <li>
                <button onClick={onOpenMemberships} className="hover:text-emerald-400 transition-colors">
                  • Senior (300 BV) - Bono Élite 3 Gen
                </button>
              </li>
              <li>
                <button onClick={onOpenMemberships} className="hover:text-emerald-400 transition-colors">
                  • Master (600 BV) - 60% en Recompras
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenRegisterModal}
                  className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Tutorial de Registro HGW</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Available Countries */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-400" />
              Países Disponibles HGW
            </h4>

            <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-300">
              {COMPANY_INFO.availableCountries.map((c) => (
                <span key={c.code} className="flex items-center gap-1 py-0.5">
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </span>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 italic mt-2">
              * Los precios pueden variar según el país y la moneda local.
            </p>
          </div>
        </div>

        {/* Legal Disclaimer Box as required in OCR */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-slate-400 text-[11px] leading-relaxed">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            Aviso de Transparencia & Descargo de Responsabilidad:
          </div>
          <p>
            <strong>Advertencia:</strong> Este sitio es operado por un afiliado independiente de HGW Health Green World Panamá. Aunque no es el sitio web corporativo central, el distribuidor cuenta con un amplio conocimiento sobre los productos, precios de socio (50+ BV) y el plan de compensación 50/50, ofreciendo asesoramiento personalizado y despacho ágil. La información aquí proporcionada refleja la experiencia del afiliado y busca brindar el mejor servicio a clientes y socios de Panamá e Iberoamérica.
          </p>
          <p>
            <strong>Aclaración sobre los productos:</strong> Los productos presentados son suplementos alimenticios, bebidas funcionales con antioxidantes, alimentos ricos en nutrientes para la nutrición celular, estimuladores del sistema natural de desintoxicación y artículos de confort/bienestar personal. No son medicamentos ni productos de uso o prescripción clínica, y no tienen la intención de diagnosticar, tratar, curar o prevenir enfermedades ni sustituir el consejo de un profesional médico certificado.
          </p>
          <p className="text-slate-500 text-[10px]">
            Los ingresos, bonos e incentivos mencionados representan el potencial del Plan de Compensación de HGW y no constituyen una promesa garantizada de ganancia sin esfuerzo comercial.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} HGW Panamá - Health Green World. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Patrocinador Asignado:</span>
            <strong className="text-emerald-400">{SPONSOR_INFO.name} ({SPONSOR_INFO.code})</strong>
          </div>
        </div>
      </div>
    </footer>
  );
};
