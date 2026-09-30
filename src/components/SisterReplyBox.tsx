import React, { useState, useEffect } from 'react';
import { Heart, Send, CheckCircle2, MessageCircleHeart } from 'lucide-react';
import { CONFIG } from '../config';

export const SisterReplyBox: React.FC = () => {
  const [selectedFeeling, setSelectedFeeling] = useState<string>('');
  const [customNote, setCustomNote] = useState<string>('');
  const [savedResponse, setSavedResponse] = useState<{ feeling: string; note: string; date: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('amna_response_to_abdaal');
      if (stored) {
        setSavedResponse(JSON.parse(stored));
      }
    } catch {
      // localStorage catch
    }
  }, []);

  const feelings = [
    { text: 'I need a little time 🤍', subtitle: 'Processing my thoughts' },
    { text: 'Thank you for saying sorry 🌸', subtitle: 'I hear your sincerity' },
    { text: 'Forgiven, but you owe me chocolate 🍫', subtitle: 'Classic sister tax' },
    { text: 'Let’s talk when you’re home 🫶', subtitle: 'Ready for peace' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeeling && !customNote.trim()) return;

    const data = {
      feeling: selectedFeeling || 'Custom Message',
      note: customNote.trim(),
      date: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    try {
      localStorage.setItem('amna_response_to_abdaal', JSON.stringify(data));
    } catch {
      // safe
    }

    setSavedResponse(data);
    setSubmitted(true);
  };

  return (
    <section className="relative py-14 sm:py-18 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl bg-white/95 p-6 sm:p-9 shadow-xl border border-rose-200/90 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-800 mb-1">
              <MessageCircleHeart className="h-4 w-4 text-rose-500" />
              <span>For {CONFIG.sisterName}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900">
              Leave A Note For Abdaal
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Whenever you feel ready, you can leave a note or select how you're feeling. There is zero pressure.
            </p>
          </div>

          {submitted || savedResponse ? (
            <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border border-emerald-200 text-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <h4 className="font-display text-lg font-bold text-emerald-950">
                Response Saved For Abdaal
              </h4>
              <p className="mt-1 text-sm text-emerald-800 font-medium">
                “{savedResponse?.feeling}”
              </p>
              {savedResponse?.note && (
                <p className="mt-2 text-xs text-slate-600 italic bg-white/70 p-3 rounded-xl border border-emerald-100 max-w-md mx-auto">
                  “{savedResponse.note}”
                </p>
              )}
              <span className="mt-3 block text-[11px] text-emerald-700/70">
                Recorded on {savedResponse?.date}
              </span>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setSavedResponse(null);
                  try {
                    localStorage.removeItem('amna_response_to_abdaal');
                  } catch {}
                }}
                className="mt-4 text-xs text-emerald-700 underline hover:text-emerald-900"
              >
                Change or update note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Quick Feeling Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {feelings.map((f, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedFeeling(f.text)}
                    className={`flex flex-col items-start p-3 rounded-xl text-left border transition-all ${
                      selectedFeeling === f.text
                        ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-xs'
                        : 'bg-slate-50/60 border-slate-200 hover:border-rose-200 text-slate-700'
                    }`}
                  >
                    <span className="text-xs font-semibold">{f.text}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">{f.subtitle}</span>
                  </button>
                ))}
              </div>

              {/* Optional Custom Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Or write your own thoughts:
                </label>
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Whatever is on your mind, Amna..."
                  rows={3}
                  className="w-full rounded-2xl border border-slate-300 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={!selectedFeeling && !customNote.trim()}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:from-rose-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <span>Leave Message</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
