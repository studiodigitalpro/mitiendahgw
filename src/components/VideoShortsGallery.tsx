import React, { useState } from 'react';
import { Play, Sparkles, Film, Award, ShieldCheck, Heart, Coffee } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  drivePreviewUrl: string;
  driveViewUrl: string;
  fileId: string;
}

export const VideoShortsGallery: React.FC = () => {
  // 3 official Google Drive demonstration videos provided by user
  const videos: VideoItem[] = [
    {
      id: 'video-ganoderma',
      title: 'Café con Ganoderma HGW',
      category: 'Bebidas Saludables & Inmunidad',
      description: 'Descubre los beneficios del hongo Ganoderma Lucidum en sinergia con el café soluble premium para fortalecer tus defensas y energía diaria.',
      drivePreviewUrl: 'https://drive.google.com/file/d/1QmaM0rvyxrI-6iX23fQhWkjYiUG1SK8m/preview',
      driveViewUrl: 'https://drive.google.com/file/d/1QmaM0rvyxrI-6iX23fQhWkjYiUG1SK8m/view?usp=sharing',
      fileId: '1QmaM0rvyxrI-6iX23fQhWkjYiUG1SK8m'
    },
    {
      id: 'video-lactiberry',
      title: 'Lactiberry Té Negro Cremoso',
      category: 'Nutrición Funcional & Digestión',
      description: 'Preparación y propiedades de Lactiberry con extracto de arándano y té negro para la salud celular y el equilibrio digestivo.',
      drivePreviewUrl: 'https://drive.google.com/file/d/1rhzzTq67ATmRxb85mJzkzp7AYgWv060i/preview',
      driveViewUrl: 'https://drive.google.com/file/d/1rhzzTq67ATmRxb85mJzkzp7AYgWv060i/view?usp=sharing',
      fileId: '1rhzzTq67ATmRxb85mJzkzp7AYgWv060i'
    },
    {
      id: 'video-chang-jin-jin',
      title: 'Fresh Drink Chang JingJing',
      category: 'Desintoxicación & Limpieza Intestinal',
      description: 'Demostración de la bebida efervescente Chang JingJing para limpiar el colon, eliminar toxinas acumuladas y revitalizar la microbiota.',
      drivePreviewUrl: 'https://drive.google.com/file/d/1Wgwm11j5qbcLcmroRaD1Vkp5OpxlV7iz/preview',
      driveViewUrl: 'https://drive.google.com/file/d/1Wgwm11j5qbcLcmroRaD1Vkp5OpxlV7iz/view?usp=sharing',
      fileId: '1Wgwm11j5qbcLcmroRaD1Vkp5OpxlV7iz'
    }
  ];

  // Si solo hay uno o ninguno, no mostrar nada
  if (!videos || videos.length <= 1) {
    return null;
  }

  return (
    <section id="videos-shorts-section" className="my-12 space-y-6">
      <div className="text-center space-y-2 max-w-3xl mx-auto border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-wider">
          <Film className="w-3.5 h-3.5" />
          Demostraciones Oficiales HGW Panamá
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Videos & Demostraciones de Productos
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Aprende sobre el Café con Ganoderma, Lactiberry y Fresh Drink Chang JingJing con demostraciones reales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl group relative flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300"
          >
            {/* Embedded Google Drive Video Frame */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <iframe
                src={vid.drivePreviewUrl}
                title={vid.title}
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>

            <div className="p-4 space-y-2 bg-slate-900 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {vid.category}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white leading-snug">{vid.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {vid.description}
                </p>
              </div>

              <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <a
                  href={vid.driveViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 hover:underline text-[11px]"
                >
                  <span>Abrir en Google Drive</span>
                  <Play className="w-3 h-3 fill-current" />
                </a>
                <span className="text-[10px] text-slate-500 font-mono">HGW Panamá</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
