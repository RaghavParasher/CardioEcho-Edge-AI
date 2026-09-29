import { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Sparkles, 
  Scan, 
  Activity, 
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { PocusCase, SimpsonsDisk } from '../types/cardiology';

interface EchoCineCanvasProps {
  currentCase: PocusCase;
  simpsonDisks: SimpsonsDisk[];
  computedLvef: number;
  onAdjustDimensions: (lengthDelta: number, widthDelta: number) => void;
}

export const EchoCineCanvas = ({
  currentCase,
  simpsonDisks,
  computedLvef,
  onAdjustDimensions,
}: EchoCineCanvasProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [cardiacPhase, setCardiacPhase] = useState<'diastole' | 'systole'>('diastole');
  const [showSimpsonsDisks, setShowSimpsonsDisks] = useState<boolean>(true);
  const [showDopplerSpectrum, setShowDopplerSpectrum] = useState<boolean>(true);
  const [lengthAdjustment, setLengthAdjustment] = useState<number>(0);
  const [widthAdjustment, setWidthAdjustment] = useState<number>(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCardiacPhase((prev) => (prev === 'diastole' ? 'systole' : 'diastole'));
    }, (60 / currentCase.heartRateBpm) * 500);

    return () => clearInterval(interval);
  }, [isPlaying, currentCase.heartRateBpm]);

  const handleRunAiRecontour = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const currentContour = cardiacPhase === 'diastole' ? currentCase.contourDiastole : currentCase.contourSystole;

  const svgPath = currentContour.map((pt, i) => {
    const adjustedX = pt.x + (pt.x > 50 ? widthAdjustment * 0.4 : -widthAdjustment * 0.4);
    const adjustedY = pt.y + (pt.y > 50 ? lengthAdjustment * 0.4 : 0);
    return `${i === 0 ? 'M' : 'L'} ${adjustedX} ${adjustedY}`;
  }).join(' ') + ' Z';

  return (
    <div className="p-6 rounded-3xl cardio-glass-card border border-white/[0.08] space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-cardio-sky/10 text-cardio-sky border border-cardio-sky/30 shadow-neon-cardio">
            <Scan className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-white">
              {currentCase.name}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Patient: <strong className="text-slate-200">{currentCase.patientId}</strong> ({currentCase.ageGender}) • HR: <strong className="text-cardio-emerald">{currentCase.heartRateBpm} BPM</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 hover:bg-slate-800 text-xs font-mono text-slate-200 transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-cardio-amber" /> : <Play className="w-3.5 h-3.5 text-cardio-emerald" />}
            <span>{isPlaying ? 'Pause Cine' : 'Play Cine'}</span>
          </button>

          <button
            onClick={handleRunAiRecontour}
            className="flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cardio-sky via-cardio-cyan to-cardio-emerald text-slate-950 font-bold font-mono text-xs shadow-neon-cardio hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Re-Segment Contours</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Ultrasound Screen */}
        <div className="lg:col-span-8 bg-[#020610] rounded-3xl p-4 border border-cardio-border relative overflow-hidden flex flex-col items-center justify-center min-h-[360px]">
          
          <div className="absolute top-3 left-4 text-[10px] font-mono text-slate-500 space-y-1 z-10 pointer-events-none">
            <div>FREQ: 3.5 MHz</div>
            <div>DEPTH: 16.0 cm</div>
            <div>FPS: 54 Hz</div>
            <div className="text-cardio-sky">PHASE: <strong className="uppercase">{cardiacPhase}</strong></div>
          </div>

          <div className="absolute top-3 right-4 text-[10px] font-mono text-right text-slate-500 space-y-1 z-10 pointer-events-none">
            <div className="text-cardio-emerald">DICE: {(currentCase.diceScore * 100).toFixed(1)}%</div>
            <div>LATENCY: {currentCase.inferenceLatencyMs}ms</div>
            <div className="text-cardio-cyan">LVEF: {computedLvef.toFixed(1)}%</div>
          </div>

          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Sector Arcs */}
              <path d="M 10 90 A 60 60 0 0 1 90 90 L 50 10 Z" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="0.5" />
              <path d="M 22 75 A 42 42 0 0 1 78 75" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeDasharray="1,2" strokeWidth="0.5" />
              <path d="M 32 55 A 25 25 0 0 1 68 55" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeDasharray="1,2" strokeWidth="0.5" />
              
              <line x1="50" y1="10" x2="50" y2="92" stroke="rgba(56, 189, 248, 0.06)" strokeDasharray="2,2" strokeWidth="0.5" />

              {/* Slicing Disks */}
              {showSimpsonsDisks && simpsonDisks.map((disk, idx) => {
                const yPos = 20 + (idx / 20) * 65;
                const halfWidth = (disk.diameterA4cMm / 60) * 18;
                return (
                  <g key={idx}>
                    <line 
                      x1={50 - halfWidth} 
                      y1={yPos} 
                      x2={50 + halfWidth} 
                      y2={yPos} 
                      stroke={cardiacPhase === 'diastole' ? 'rgba(56, 189, 248, 0.35)' : 'rgba(6, 182, 212, 0.4)'} 
                      strokeWidth="0.8" 
                    />
                    <circle cx={50 - halfWidth} cy={yPos} r="0.8" fill="#38bdf8" />
                    <circle cx={50 + halfWidth} cy={yPos} r="0.8" fill="#38bdf8" />
                  </g>
                );
              })}

              <path
                d={svgPath}
                fill={cardiacPhase === 'diastole' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(6, 182, 212, 0.18)'}
                stroke={cardiacPhase === 'diastole' ? '#38bdf8' : '#06b6d4'}
                strokeWidth="1.2"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              <circle cx="50" cy={cardiacPhase === 'diastole' ? 15 : 22} r="1.5" fill="#10b981" />
              <text x="50" y={cardiacPhase === 'diastole' ? 12 : 19} textAnchor="middle" fill="#10b981" fontSize="3" fontFamily="monospace">APEX</text>

              <circle cx="28" cy={cardiacPhase === 'diastole' ? 88 : 84} r="1.5" fill="#f59e0b" />
              <circle cx="72" cy={cardiacPhase === 'diastole' ? 88 : 84} r="1.5" fill="#f59e0b" />
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between w-full pt-3 border-t border-white/[0.06] text-xs font-mono">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCardiacPhase('diastole')}
                className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                  cardiacPhase === 'diastole'
                    ? 'bg-cardio-sky text-slate-950 font-bold border-cardio-sky shadow-neon-cardio'
                    : 'bg-slate-900 text-slate-400 border-white/10'
                }`}
              >
                End-Diastole (EDV)
              </button>

              <button
                onClick={() => setCardiacPhase('systole')}
                className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                  cardiacPhase === 'systole'
                    ? 'bg-cardio-cyan text-slate-950 font-bold border-cardio-cyan shadow-neon-cardio'
                    : 'bg-slate-900 text-slate-400 border-white/10'
                }`}
              >
                End-Systole (ESV)
              </button>
            </div>

            <div className="flex items-center space-x-3 text-[11px] text-slate-400">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSimpsonsDisks}
                  onChange={(e) => setShowSimpsonsDisks(e.target.checked)}
                  className="rounded bg-slate-900 border-white/20 text-cardio-sky focus:ring-0"
                />
                <span>20-Disk Slicing</span>
              </label>

              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDopplerSpectrum}
                  onChange={(e) => setShowDopplerSpectrum(e.target.checked)}
                  className="rounded bg-slate-900 border-white/20 text-cardio-sky focus:ring-0"
                />
                <span>Doppler Velocity</span>
              </label>
            </div>
          </div>

        </div>

        {/* Right Parameter Calibration Panel */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 uppercase font-bold">Diagnostic finding:</span>
              <span className="text-cardio-sky font-bold">ECG: {currentCase.ecgRhythm}</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {currentCase.clinicalFinding}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.06] space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-400 font-bold uppercase">
              <span className="flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5 text-cardio-cyan" />
                <span>Cavity Dimension Calibration</span>
              </span>
              <span className="text-cardio-emerald">Active</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Apex-to-Base Length Trim:</span>
                <span className="text-white">{lengthAdjustment > 0 ? `+${lengthAdjustment}` : lengthAdjustment} mm</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                value={lengthAdjustment}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setLengthAdjustment(val);
                  onAdjustDimensions(val, widthAdjustment);
                }}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cardio-sky"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Basal Diameter Trim:</span>
                <span className="text-white">{widthAdjustment > 0 ? `+${widthAdjustment}` : widthAdjustment} mm</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                value={widthAdjustment}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setWidthAdjustment(val);
                  onAdjustDimensions(lengthAdjustment, val);
                }}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cardio-cyan"
              />
            </div>
          </div>

          {showDopplerSpectrum && (
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 uppercase font-bold flex items-center space-x-1">
                  <Activity className="w-3.5 h-3.5 text-cardio-emerald" />
                  <span>Mitral Inflow Doppler Spectrum:</span>
                </span>
                <span className="text-cardio-emerald font-bold">E/A: {currentCase.hemodynamics.eaRatio.toFixed(2)}</span>
              </div>

              <div className="h-16 w-full flex items-end">
                <svg viewBox="0 0 600 150" className="w-full h-full">
                  <path
                    d="M 0 140 Q 100 20 200 140 T 400 60 T 600 140"
                    fill="rgba(16, 185, 129, 0.15)"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  <line x1="0" y1="140" x2="600" y2="140" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <text x="100" y="30" fill="#38bdf8" fontSize="18" fontFamily="monospace">E-Wave (Early)</text>
                  <text x="360" y="55" fill="#f59e0b" fontSize="18" fontFamily="monospace">A-Wave (Atrial)</text>
                </svg>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
