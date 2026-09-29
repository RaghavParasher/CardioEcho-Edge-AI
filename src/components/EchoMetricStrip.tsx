import { 
  Heart, 
  Activity, 
  Layers, 
  Cpu
} from 'lucide-react';
import type { HemodynamicProfile } from '../types/cardiology';

interface EchoMetricStripProps {
  hemodynamics: HemodynamicProfile;
  diceScore: number;
  inferenceLatencyMs: number;
}

export const EchoMetricStrip = ({
  hemodynamics,
  diceScore,
  inferenceLatencyMs,
}: EchoMetricStripProps) => {
  const isReducedEf = hemodynamics.lvefPct < 40;
  const isMildlyReduced = hemodynamics.lvefPct >= 40 && hemodynamics.lvefPct < 50;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. LVEF % & Heart Failure Phenotype */}
      <div className={`p-5 rounded-3xl cardio-glass-card border relative overflow-hidden transition-all ${
        isReducedEf 
          ? 'border-cardio-red/40 hover:border-cardio-red shadow-neon-red' 
          : isMildlyReduced 
          ? 'border-cardio-amber/40 hover:border-cardio-amber' 
          : 'border-cardio-sky/30 hover:border-cardio-sky shadow-neon-cardio'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
            Biplane LVEF (Simpson's)
          </span>
          <div className={`p-2 rounded-xl border ${
            isReducedEf 
              ? 'bg-cardio-red/10 text-cardio-red border-cardio-red/30' 
              : 'bg-cardio-sky/10 text-cardio-sky border-cardio-sky/30'
          }`}>
            <Heart className="w-4 h-4 animate-pulse" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className={`text-3xl font-black font-display ${
            isReducedEf ? 'text-cardio-red' : isMildlyReduced ? 'text-cardio-amber' : 'text-cardio-emerald'
          }`}>
            {hemodynamics.lvefPct.toFixed(1)}%
          </span>
          <span className="text-xs text-slate-400 font-mono font-bold">
            {hemodynamics.lvefPct >= 50 ? 'Preserved' : hemodynamics.lvefPct >= 40 ? 'Mildly Reduced' : 'Severe HFrEF'}
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-300 font-mono truncate">
          {hemodynamics.phenotype}
        </div>
      </div>

      {/* 2. Biplane Volumes (EDV & ESV) */}
      <div className="p-5 rounded-3xl cardio-glass-card border border-white/[0.08] hover:border-cardio-cyan/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
            Chamber Volumes
          </span>
          <div className="p-2 rounded-xl bg-cardio-cyan/10 text-cardio-cyan border border-cardio-cyan/20">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-3">
          <div>
            <span className="text-[10px] text-slate-500 font-mono block">EDV:</span>
            <span className="text-xl font-bold font-display text-white">{hemodynamics.edvMl} <span className="text-xs text-slate-400">mL</span></span>
          </div>
          <div className="text-slate-600">|</div>
          <div>
            <span className="text-[10px] text-slate-500 font-mono block">ESV:</span>
            <span className="text-xl font-bold font-display text-cardio-cyan">{hemodynamics.esvMl} <span className="text-xs text-slate-400">mL</span></span>
          </div>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 font-mono">
          Stroke Volume (SV): <strong className="text-cardio-emerald">{hemodynamics.strokeVolumeMl} mL</strong>
        </div>
      </div>

      {/* 3. Global Longitudinal Strain (GLS %) */}
      <div className="p-5 rounded-3xl cardio-glass-card border border-white/[0.08] hover:border-cardio-emerald/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
            Myocardial Strain (GLS)
          </span>
          <div className="p-2 rounded-xl bg-cardio-emerald/10 text-cardio-emerald border border-cardio-emerald/20">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-3xl font-black font-display text-cardio-emerald">
            {hemodynamics.glsStrainPct}%
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {hemodynamics.glsStrainPct <= -18 ? 'Normal (<-18%)' : 'Impaired Contractility'}
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 font-mono">
          Wall Motion Index: <strong className="text-white">{hemodynamics.wallMotionScoreIndex.toFixed(2)}</strong> (Norm: 1.0)
        </div>
      </div>

      {/* 4. Edge AI Latency & Dice Score */}
      <div className="p-5 rounded-3xl cardio-glass-card border border-white/[0.08] hover:border-cardio-sky/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
            Edge AI WebGPU Inference
          </span>
          <div className="p-2 rounded-xl bg-cardio-sky/10 text-cardio-sky border border-cardio-sky/20">
            <Cpu className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-3xl font-black font-display text-cardio-sky">
            {inferenceLatencyMs} <span className="text-base text-slate-400">ms</span>
          </span>
          <span className="text-xs text-emerald-400 font-mono font-bold">REAL-TIME</span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 font-mono">
          Segmentation Dice: <strong className="text-cardio-emerald">{(diceScore * 100).toFixed(1)}%</strong> (Sub-pixel)
        </div>
      </div>

    </div>
  );
};

