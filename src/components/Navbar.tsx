import { 
  Activity, 
  FileText, 
  Presentation, 
  Zap
} from 'lucide-react';
import type { PocusView } from '../types/cardiology';

interface NavbarProps {
  activeView: PocusView;
  onOpenReportModal: () => void;
  onOpenSlideModal: () => void;
}

export const Navbar = ({
  activeView,
  onOpenReportModal,
  onOpenSlideModal,
}: NavbarProps) => {
  const viewLabels: Record<PocusView, string> = {
    'A4C': 'Apical 4-Chamber (A4C)',
    'PLAX': 'Parasternal Long Axis (PLAX)',
    'A2C': 'Apical 2-Chamber (A2C)',
    'IVC': 'Subcostal IVC View',
  };

  return (
    <header className="sticky top-0 z-40 bg-[#050a14]/90 backdrop-blur-xl border-b border-cardio-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Hack2Heal Badge */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cardio-sky via-cardio-cyan to-cardio-emerald p-0.5 shadow-neon-cardio">
              <div className="w-full h-full bg-[#071224] rounded-[14px] flex items-center justify-center">
                <Activity className="w-6 h-6 text-cardio-sky animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-black text-base sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cardio-sky tracking-tight">
                  CARDIOECHO EDGE-AI
                </span>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-cardio-sky/20 text-cardio-sky border border-cardio-sky/40 shadow-neon-cardio">
                  HACK2HEAL 2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
                Real-Time Edge POCUS Echocardiogram Telemetry & Biplane LVEF Studio
              </p>
            </div>
          </div>

          {/* Controls & Modals */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Edge WASM status */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-slate-900/90 border border-white/10 text-xs font-mono">
              <Zap className="w-3.5 h-3.5 text-cardio-emerald animate-bounce" />
              <span className="text-slate-300">
                Window: <strong className="text-cardio-sky">{viewLabels[activeView]}</strong>
              </span>
            </div>

            {/* Official 6-Slide Presentation Deck */}
            <button
              onClick={onOpenSlideModal}
              className="flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-300 font-bold font-mono text-xs shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Presentation className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">Official 6-Slide Deck</span>
            </button>

            {/* Export EHR Clinical Report */}
            <button
              onClick={onOpenReportModal}
              className="flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cardio-sky via-cardio-cyan to-cardio-emerald text-slate-950 font-bold font-mono text-xs shadow-neon-cardio transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Export DICOM/EHR Report</span>
            </button>

            {/* GitHub Repo */}
            <a
              href="https://github.com/RaghavParasher"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-400 hover:text-white transition-colors"
              title="View GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

          </div>

        </div>
      </div>
    </header>
  );
};

