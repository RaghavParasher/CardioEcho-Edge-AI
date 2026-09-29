import { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  Presentation, 
  Layers, 
  CheckCircle2
} from 'lucide-react';
import { HACK2HEAL_OFFICIAL_SLIDES } from '../services/cardiacDatasets';

interface OfficialPresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficialPresentationModal = ({
  isOpen,
  onClose,
}: OfficialPresentationModalProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!isOpen) return null;

  const currentSlide = HACK2HEAL_OFFICIAL_SLIDES[currentSlideIndex];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => Math.min(HACK2HEAL_OFFICIAL_SLIDES.length - 1, prev + 1));
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="cardio-glass-card max-w-4xl w-full p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-2xl space-y-6 relative max-h-[92vh] flex flex-col justify-between overflow-y-auto">
        
        {/* Header with Navigation Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-cardio-purple/20 text-purple-400 border border-cardio-purple/40 shadow-neon-cardio">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-bold text-lg text-white">
                  Hack2Heal 2.0 Official Idea Deck
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                  SLIDE {currentSlideIndex + 1} OF 6
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Compliant with Official Hack2Heal 2.0 Template & Scopus Research Criteria
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrintPdf}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:bg-slate-800 text-xs font-mono text-purple-300 transition-colors cursor-pointer"
              title="Print Slides to PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Slide Card Display */}
        <div className="bg-[#030712] rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 flex-1 flex flex-col justify-between">
          
          {/* Slide Header */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                {currentSlide.highlightBadge}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Template Version 2.0
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              {currentSlide.title}
            </h2>
            <p className="text-sm text-cardio-sky font-mono">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Bullet Points */}
          <div className="space-y-3 font-sans text-xs sm:text-sm">
            {currentSlide.bullets.map((b, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
                <strong className="text-cardio-emerald font-mono text-xs uppercase tracking-wide block">
                  • {b.label}:
                </strong>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {b.text}
                </p>
              </div>
            ))}
          </div>

          {/* Slide Infographic / Flowchart Box (if defined) */}
          {currentSlide.diagramItems && (
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-purple-500/20 space-y-2">
              <span className="text-[11px] font-mono text-purple-300 font-bold uppercase flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>{currentSlide.diagramTitle}</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {currentSlide.diagramItems.map((item, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-900 border border-white/5 text-[11px] font-mono text-slate-200 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cardio-sky shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Slide Footer Navigation */}
        <div className="flex items-center justify-between pt-2">
          
          {/* Dot indicators */}
          <div className="flex items-center space-x-2">
            {HACK2HEAL_OFFICIAL_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx
                    ? 'w-8 bg-cardio-sky shadow-neon-cardio'
                    : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                }`}
                title={`Go to Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next / Previous buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className={`p-2.5 rounded-xl border font-mono text-xs flex items-center space-x-1 transition-colors ${
                currentSlideIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-950 border-white/5 text-slate-600'
                  : 'bg-slate-900 border-white/10 hover:bg-slate-800 text-white cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous Slide</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentSlideIndex === HACK2HEAL_OFFICIAL_SLIDES.length - 1}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center space-x-1 transition-all ${
                currentSlideIndex === HACK2HEAL_OFFICIAL_SLIDES.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-slate-950 border border-white/5 text-slate-600'
                  : 'bg-gradient-to-r from-cardio-sky via-cardio-cyan to-cardio-emerald text-slate-950 shadow-neon-cardio hover:scale-105 active:scale-95 cursor-pointer'
              }`}
            >
              <span className="hidden sm:inline">Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
