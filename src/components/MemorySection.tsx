import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles, Upload, ExternalLink, Heart } from 'lucide-react';
import { CONFIG, MemoryPhoto } from '../config';

export const MemorySection: React.FC = () => {
  const [photos, setPhotos] = useState<MemoryPhoto[]>(CONFIG.photos);
  const [editingPhoto, setEditingPhoto] = useState<MemoryPhoto | null>(null);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  const handleSaveCustomPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;

    const updated = photos.map((p) =>
      p.id === editingPhoto.id ? { ...p, url: customUrlInput.trim() } : p
    );
    setPhotos(updated);
    setImageErrorMap((prev) => ({ ...prev, [editingPhoto.id]: false }));
    setEditingPhoto(null);
    setCustomUrlInput('');
  };

  return (
    <section id="memories" className="relative py-16 sm:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800 mb-2">
            <span>Treasured Snapshots</span>
            <span aria-hidden="true" className="text-rose-400">·</span>
            <span>Growing Up Together</span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl text-balance">
            Our Little Memories 📸
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
            These frames are reserved for our favorite moments. You can personalize them anytime.
          </p>
        </div>

        {/* Memory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((item, index) => {
            const hasCustomImage =
              item.url &&
              !item.url.startsWith('PHOTO_URL') &&
              !imageErrorMap[item.id];

            return (
              <div
                key={item.id}
                className="group relative flex flex-col rounded-3xl bg-white p-4 shadow-sm border border-rose-100/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
              >
                {/* Photo Frame Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50/60 border border-rose-100 flex flex-col items-center justify-center text-center p-6">
                  {hasCustomImage ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(item.id)}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* Graceful Illustrated Fallback Container */
                    <div className="flex flex-col items-center justify-center p-3 select-none">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xs border border-rose-100 text-rose-400 mb-3 group-hover:scale-110 transition-transform">
                        <Camera className="h-7 w-7 stroke-[1.5]" />
                      </div>
                      <span className="text-xs font-semibold text-rose-900/80 mb-1">
                        Memory Slot #{index + 1}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium leading-tight">
                        {item.title}
                      </span>
                    </div>
                  )}

                  {/* Gentle Polarized Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button
                      onClick={() => {
                        setEditingPhoto(item);
                        setCustomUrlInput(item.url.startsWith('PHOTO_URL') ? '' : item.url);
                      }}
                      className="w-full rounded-xl bg-white/95 py-2 text-xs font-semibold text-rose-900 shadow-md backdrop-blur-xs hover:bg-white transition-colors"
                    >
                      {hasCustomImage ? 'Change Photo' : 'Add Photo'}
                    </button>
                  </div>
                </div>

                {/* Caption / Title */}
                <div className="mt-4 px-1 pb-1">
                  <h3 className="font-display text-base font-semibold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Easy URL / Photo Personalization Modal */}
        {editingPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setEditingPhoto(null)}
          >
            <div
              className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-rose-200"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-xl font-bold text-slate-900">
                Personalize: {editingPhoto.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Paste any image URL or photo link to display in this memory frame.
              </p>

              <form onSubmit={handleSaveCustomPhoto} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="https://example.com/our-photo.jpg"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingPhoto(null)}
                    className="rounded-xl px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-rose-700 transition-colors"
                  >
                    Save Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
