import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Phone, 
  UserCheck, 
  ExternalLink,
  ChevronRight,
  ShoppingBag,
  Info
} from 'lucide-react';
import { SPONSOR_INFO, MEMBERSHIP_PLANS } from '../data/memberships';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ChatMessage, generateYamilkaResponse } from '../utils/yamilkaKnowledge';

interface YamilkaChatbotProps {
  onSelectProduct?: (product: Product) => void;
  onOpenMemberships?: () => void;
}

export const YamilkaChatbot: React.FC<YamilkaChatbotProps> = ({
  onSelectProduct,
  onOpenMemberships
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickPills, setShowQuickPills] = useState(true);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'yamilka',
      text: '¡Hola! 👋 Soy Yamilka Batista. Qué gusto tenerte por aquí 😊. Cuéntame, ¿qué estás buscando? Puedo ayudarte a conocer nuestros productos, orientarte según lo que necesitas o explicarte cómo comprar con descuento.',
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input on desktop
      if (window.innerWidth > 640) {
        setTimeout(() => inputRef.current?.focus(), 300);
      }
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isTyping) return;

    setShowQuickPills(false);
    setInputMessage('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // 1. Try server API route first
      let botReply = '';
      let suggestedProducts: Product[] | undefined;
      let suggestedAction: 'whatsapp' | 'register' | 'catalog' | 'memberships' | undefined;
      let actionUrl: string | undefined;
      let actionLabel: string | undefined;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userMessage: query,
            messages: [...messages, userMsg].map(m => ({ sender: m.sender, text: m.text })),
            contextProducts: PRODUCTS.map(p => ({
              name: p.name,
              category: p.categoryLabel,
              pricePublic: p.pricePublic,
              pricePartner: p.pricePartner,
              presentation: p.presentation,
              shortDescription: p.shortDescription,
              benefits: p.benefits,
              ingredients: p.ingredients,
              usage: p.usage
            })),
            contextMemberships: MEMBERSHIP_PLANS.map(m => ({
              name: m.name,
              bv: m.bvRequired,
              approx: m.approxInvestment,
              discount: m.discountRecompra
            }))
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.reply && !data.fallback) {
            botReply = data.reply;
          }
        }
      } catch (err) {
        // Fallback to local intelligence
        console.log('Using local conversational engine notice:', err);
      }

      // If server did not return a custom reply, use local knowledge generator
      if (!botReply) {
        const localResult = generateYamilkaResponse(query, [...messages, userMsg]);
        botReply = localResult.reply;
        suggestedProducts = localResult.suggestedProducts;
        suggestedAction = localResult.suggestedAction;
        actionUrl = localResult.actionUrl;
        actionLabel = localResult.actionLabel;
      }

      // Natural pause to simulate real typing
      await new Promise(r => setTimeout(r, 600));

      const yamilkaMsg: ChatMessage = {
        id: `yamilka-${Date.now()}`,
        sender: 'yamilka',
        text: botReply,
        timestamp: new Date(),
        suggestedProducts,
        suggestedAction,
        actionUrl,
        actionLabel
      };

      setMessages(prev => [...prev, yamilkaMsg]);
    } catch (e) {
      console.error('Chat error:', e);
      const fallbackMsg: ChatMessage = {
        id: `yamilka-err-${Date.now()}`,
        sender: 'yamilka',
        text: '¡Hola! 😊 Si tienes alguna duda puntual o quieres que te ayude a coordinar tu pedido de inmediato, puedes escribirme directamente a mi WhatsApp (+507 6778-8375).',
        timestamp: new Date(),
        suggestedAction: 'whatsapp',
        actionUrl: 'https://wa.me/50767788375',
        actionLabel: '💬 Chatear por WhatsApp'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (label: string, promptText: string) => {
    handleSendMessage(promptText);
  };

  const toggleChat = () => {
    if (!isOpen && !hasOpenedBefore) {
      setHasOpenedBefore(true);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Trigger Button - Left Side */}
      <div 
        id="yamilka-chat-launcher"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 group"
      >
        <button
          id="btn-open-yamilka-chat"
          onClick={toggleChat}
          aria-label="Abrir chat con Yamilka Batista"
          className="relative p-1 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-2xl shadow-emerald-900/30 transform hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white dark:border-slate-800 flex items-center justify-center cursor-pointer"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/60 bg-emerald-100 flex items-center justify-center">
            <img
              src={SPONSOR_INFO.image}
              alt="Yamilka Batista"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                // Fallback avatar icon if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Online green indicator dot */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>

          {/* Notification bubble if never opened */}
          {!hasOpenedBefore && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600 border border-white text-[9px] font-black text-white items-center justify-center">
                1
              </span>
            </span>
          )}
        </button>

        {/* Subtle tooltip pill on desktop hover to the right of the button */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold shadow-xl border border-slate-700/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform -translate-x-2 group-hover:translate-x-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Pregúntale a Yamilka</span>
        </div>
      </div>

      {/* Chat Window Modal / Pop-up Drawer - Left Aligned */}
      {isOpen && (
        <div
          id="yamilka-chat-window"
          className="fixed inset-x-3 bottom-3 sm:inset-auto sm:bottom-24 sm:left-6 z-50 w-auto sm:w-[420px] max-w-[calc(100vw-24px)] h-[82vh] sm:h-[580px] max-h-[700px] bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          role="dialog"
          aria-labelledby="chat-yamilka-title"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white flex items-center justify-between shadow-md relative z-10">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white/80 shadow bg-white/20 flex-shrink-0">
                <img
                  src={SPONSOR_INFO.image}
                  alt="Yamilka Batista"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-white rounded-full"></span>
              </div>
              <div className="leading-tight">
                <h3 id="chat-yamilka-title" className="font-bold text-sm sm:text-base text-white flex items-center gap-1.5">
                  Yamilka Batista
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-medium">Panamá</span>
                </h3>
                <p className="text-[11px] text-emerald-100 font-medium">
                  Distribuidora Independiente HGW
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-200 font-semibold mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span>Disponible para ayudarte</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                id="chat-header-whatsapp"
                href="https://wa.me/50767788375"
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir WhatsApp directo"
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                aria-label="Contactar a Yamilka por WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                id="btn-close-yamilka-chat"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-950/60 space-y-3.5 text-xs sm:text-sm">
            {/* Disclaimer pill */}
            <div className="flex justify-center">
              <span className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                Atención directa con Yamilka Batista • HGW Panamá
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'yamilka' && (
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-emerald-500/50 flex-shrink-0 mt-0.5 shadow-sm">
                    <img
                      src={SPONSOR_INFO.image}
                      alt="Yamilka"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}

                <div className={`max-w-[84%] sm:max-w-[80%] space-y-2`}>
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-xs shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/80 dark:border-slate-700/80 shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Suggested Product Cards inside chat */}
                  {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {msg.suggestedProducts.map((p) => (
                        <div
                          key={p.id}
                          className="p-2.5 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between gap-3 hover:border-emerald-500 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex-shrink-0">
                              <img
                                src={p.image || p.fallbackImage}
                                alt={p.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain p-0.5"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                                {p.name}
                              </h4>
                              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                                ${p.pricePublic.toFixed(2)} <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">(Socio: ${p.pricePartner.toFixed(2)})</span>
                              </p>
                            </div>
                          </div>

                          {onSelectProduct && (
                            <button
                              id={`chat-prod-view-${p.id}`}
                              onClick={() => {
                                onSelectProduct(p);
                                setIsOpen(false);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold flex items-center gap-1 flex-shrink-0 transition-colors cursor-pointer"
                            >
                              <span>Ver</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Contextual Action Button */}
                  {msg.suggestedAction && msg.actionUrl && (
                    <div className="pt-1">
                      <a
                        id={`chat-action-btn-${msg.id}`}
                        href={msg.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                      >
                        {msg.suggestedAction === 'whatsapp' && <Phone className="w-3.5 h-3.5" />}
                        {msg.suggestedAction === 'register' && <UserCheck className="w-3.5 h-3.5" />}
                        <span>{msg.actionLabel || 'Continuar'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  <div className={`text-[9px] text-slate-400 px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-emerald-500/50 flex-shrink-0 shadow-sm">
                  <img
                    src={SPONSOR_INFO.image}
                    alt="Yamilka"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1.5 shadow-sm">
                  <span className="font-medium text-[11px] text-emerald-700 dark:text-emerald-300">Yamilka está escribiendo</span>
                  <span className="flex gap-1 items-center ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Pills (RULE 22) */}
          {showQuickPills && (
            <div className="px-3 py-2 bg-slate-100/80 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                id="pill-quick-products"
                onClick={() => handleQuickAction('🛍️ Ver productos', '¿Qué productos tienen disponibles?')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-[11px] font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                🛍️ Ver productos
              </button>
              <button
                id="pill-quick-recommendation"
                onClick={() => handleQuickAction('💡 Recomendación', 'Necesito una recomendación para mi salud')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-[11px] font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                💡 Recomendación
              </button>
              <button
                id="pill-quick-prices"
                onClick={() => handleQuickAction('💰 Precios', '¿Cuáles son los precios y descuentos?')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-[11px] font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                💰 Conocer precios
              </button>
              <button
                id="pill-quick-partner"
                onClick={() => handleQuickAction('🤝 Ser socio', 'Quiero ser socio y conocer las membresías')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-[11px] font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                🤝 Quiero ser socio
              </button>
              <button
                id="pill-quick-whatsapp"
                onClick={() => handleQuickAction('💬 WhatsApp', 'Quiero hablar con Yamilka por WhatsApp')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 border border-emerald-300 dark:border-emerald-700 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 transition-colors cursor-pointer"
              >
                💬 Hablar con Yamilka
              </button>
            </div>
          )}

          {/* Footer Input Bar */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                id="input-yamilka-chat"
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu pregunta a Yamilka..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                id="btn-send-yamilka-chat"
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                aria-label="Enviar mensaje a Yamilka"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white shadow-md transition-all cursor-pointer flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
