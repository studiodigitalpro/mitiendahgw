import React, { useState } from 'react';
import { Play, Sparkles, Film } from 'lucide-react';

export const VideoShortsGallery: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 'short1',
      title: 'Blueberry Candy - Antioxidantes de Bolsillo',
      src: 'https://hgwpanama.com/wp-content/uploads/2026/08/BLUBERRY-CANDY-SHORT1.mp4',
      thumbnail: 'https://hgwpanama.com/wp-content/uploads/2026/08/thumbnail-MrD1MIwrIdM-1280x720-1.jpg',
      label: 'Antioxidantes y Visión'
    },
    {
      id: 'short2',
      title: 'Beneficios del Arándano Canadiense en HGW',
      src: 'https://hgwpanama.com/wp-content/uploads/2026/08/BLUBERRY-CANDY-SHORT2.mp4',
      thumbnail: 'https://hgwpanama.com/wp-content/uploads/2026/08/thumbnail-y06POcZzF58-1280x720-1.jpg',
      label: 'Biotecnología HGW'
    },
    {
      id: 'short3',
      title: 'Serie Candy HGW - Energía y Bienestar',
      src: 'https://hgwpanama.com/wp-content/uploads/2026/08/BLUBERRY-CANDY-SHORT3.mp4',
      thumbnail: 'https://hgwpanama.com/wp-content/uploads/2026/08/thumbnail-mTb2gAti6rI-1280x720-1.jpg',
      label: 'Salud Diaria'
    }
  ];

  return (
    <section id="videos-shorts-section" className="my-12 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5" />
            Demostraciones & Experiencias HGW
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Videos & Demostraciones de Productos
          </h2>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Descubre el poder de los arándanos y la turmalina en acción
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg group relative flex flex-col"
          >
            <div className="relative aspect-[9/16] sm:aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <video
                src={vid.src}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 space-y-1.5 bg-slate-900">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {vid.label}
              </span>
              <h3 className="font-bold text-sm text-white">{vid.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
