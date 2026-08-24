import React, { useState } from 'react';
import { Play, Sparkles, Film, Award, ShieldCheck, Heart, Coffee } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  src: string;
  thumbnail: string;
  duration: string;
}

export const VideoShortsGallery: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Varied list of demonstration and educational video shorts
  const videos: VideoItem[] = [
    {
      id: 'short1',
      title: 'Arándano Canadiense & Serie Candy HGW',
      category: 'Antioxidantes & Visión',
      description: 'Descubre cómo los caramelos y extractos de arándano en frío protegen tu vista de la luz azul y el envejecimiento celular.',
      src: 'https://hgwpanama.com/wp-content/uploads/2026/08/BLUBERRY-CANDY-SHORT1.mp4',
      thumbnail: 'https://hgwpanama.com/wp-content/uploads/2026/08/thumbnail-MrD1MIwrIdM-1280x720-1.jpg',
      duration: '0:58'
    },
    {
      id: 'short2',
      title: 'Terapia con Turmalina & Fajas Térmicas 6G',
      category: 'Terapia & Bienestar Físico',
      description: 'Demostración de los iones negativos y el calor infrarrojo lejano de la turmalina para aliviar dolores musculares y lumbares.',
      src: 'https://hgwpanama.com/wp-content/uploads/2026/08/BLUBERRY-CANDY-SHORT2.mp4',
      thumbnail: 'https://hgwpanama.com/wp-content/uploads/2026/08/thumbnail-y06POcZzF58-1280x720-1.jpg',
      duration: '1:12'
    },
    {
      id: 'short3',
      title: 'Plan de Negocio & Ganancia Mutua 50/50 HGW',
      category: 'Oportunidad de Emprendimiento',
      description: 'Conoce cómo funciona el revolucionario plan patentado de HGW donde ganas comisiones tanto de tu equipo como de tu patrocinador.',
      src: 'https://hgwpanama.com/wp-content/uploads/2026/08/BLUBERRY-CANDY-SHORT3.mp4',
      thumbnail: 'https://hgwpanama.com/wp-content/uploads/2026/08/thumbnail-mTb2gAti6rI-1280x720-1.jpg',
      duration: '1:45'
    }
  ];

  // Si solo hay uno o ninguno, no mostrar nada
  if (!videos || videos.length <= 1) {
    return null;
  }

  return (
    <section id="videos-shorts-section" className="my-12 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Film className="w-4 h-4" />
            Demostraciones & Experiencias HGW
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Videos, Testimonios & Demostraciones
          </h2>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Aprende sobre el poder del arándano, la turmalina y el plan de negocio en acción
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg group relative flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300"
          >
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <video
                src={vid.src}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                poster={vid.thumbnail}
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] font-mono font-bold text-white">
                {vid.duration}
              </div>
            </div>

            <div className="p-4 space-y-2 bg-slate-900">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {vid.category}
              </span>
              <h3 className="font-bold text-sm text-white leading-snug">{vid.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {vid.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
