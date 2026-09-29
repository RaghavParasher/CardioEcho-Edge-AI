import { 
  Stethoscope, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import type { HemodynamicProfile, PocusCase } from '../types/cardiology';

interface HemodynamicsMatrixProps {
  currentCase: PocusCase;
  hemodynamics: HemodynamicProfile;
}

export const HemodynamicsMatrix = ({
  currentCase,
  hemodynamics,
}: HemodynamicsMatrixProps) => {
  const isReduced = hemodynamics.lvefPct < 40;

  return (
    <div className="p-6 rounded-3xl cardio-glass-card border border-white/[0.08] space-y-6">
      
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-white/[0.08]">
        <div className="p-2.5 rounded-2xl bg-cardio-cyan/10 text-cardio-cyan border border-cardio-cyan/30 shadow-neon-cardio">
          <Stethoscope className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-base sm:text-lg text-white">
            Hemodynamic Profile & Advanced Valvular Telemetry
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Derived via Biplane Method of Disks & continuous flow equations (BSA: {currentCase.bsaM2} m²)
          </p>
        </div>
      </div>

      {/* 6-Card Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Stroke Volume */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.06] space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>Stroke Volume (SV):</span>
            <span className="text-cardio-emerald font-bold">EDV - ESV</span>
          </div>
          <div className="text-2xl font-black text-white font-display pt-1">
            {hemodynamics.strokeVolumeMl} <span className="text-xs text-slate-400">mL/beat</span>
          </div>
          <span className="text-[10px] text-slate-500">Normal Range: 60 - 100 mL</span>
        </div>

        {/* Cardiac Output */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.06] space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>Cardiac Output (CO):</span>
            <span className="text-cardio-sky font-bold">SV × HR</span>
          </div>
          <div className="text-2xl font-black text-cardio-sky font-display pt-1">
            {hemodynamics.cardiacOutputLMin} <span className="text-xs text-slate-400">L/min</span>
          </div>
          <span className="text-[10px] text-slate-500">Normal Range: 4.0 - 8.0 L/min</span>
        </div>

        {/* Cardiac Index */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.06] space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>Cardiac Index (CI):</span>
            <span className={hemodynamics.cardiacIndexLMinM2 >= 2.2 ? 'text-emerald-400' : 'text-cardio-red'}>
              {hemodynamics.cardiacIndexLMinM2 >= 2.2 ? 'Normal' : 'Low Perfusion'}
            </span>
          </div>
          <div className="text-2xl font-black text-white font-display pt-1">
            {hemodynamics.cardiacIndexLMinM2} <span className="text-xs text-slate-400">L/min/m²</span>
          </div>
          <span className="text-[10px] text-slate-500">Cardiogenic Shock Threshold: &lt;2.2</span>
        </div>

        {/* Mitral E/A Ratio */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.06] space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>Diastolic E/A Ratio:</span>
            <span className="text-cardio-cyan font-bold">Inflow Pattern</span>
          </div>
          <div className="text-2xl font-black text-cardio-cyan font-display pt-1">
            {hemodynamics.eaRatio}
          </div>
          <span className="text-[10px] text-slate-500">Grade I &lt;0.8 • Grade III &gt;2.0</span>
        </div>

        {/* Wall Motion Index */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.06] space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>Wall Motion (WMSI):</span>
            <span className={hemodynamics.wallMotionScoreIndex === 1.0 ? 'text-emerald-400' : 'text-amber-400'}>
              {hemodynamics.wallMotionScoreIndex === 1.0 ? 'Uniform' : 'Regional Asynchrony'}
            </span>
          </div>
          <div className="text-2xl font-black text-white font-display pt-1">
            {hemodynamics.wallMotionScoreIndex}
          </div>
          <span className="text-[10px] text-slate-500">1.0: Normal • 2.0: Hypokinetic</span>
        </div>

        {/* Central Venous / IVC Pressure */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.06] space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>RAP / IVC Collapsibility:</span>
            <span className="text-cardio-emerald font-bold">Subcostal</span>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-display pt-1">
            {currentCase.hemodynamics.rightAtrialPressureMmHg ? `${currentCase.hemodynamics.rightAtrialPressureMmHg} mmHg` : '< 5 mmHg'}
          </div>
          <span className="text-[10px] text-slate-500">
            {currentCase.hemodynamics.ivcCollapsibilityPct ? `Collapsibility: ${currentCase.hemodynamics.ivcCollapsibilityPct}%` : 'Normal Inspiratory Collapse'}
          </span>
        </div>

      </div>

      {/* Clinical Recommendation Action Box */}
      <div className={`p-5 rounded-2xl border space-y-2 ${
        isReduced 
          ? 'bg-cardio-red/10 border-cardio-red/30' 
          : 'bg-cardio-sky/10 border-cardio-sky/30'
      }`}>
        <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase">
          {isReduced ? <AlertTriangle className="w-4 h-4 text-cardio-red" /> : <CheckCircle2 className="w-4 h-4 text-cardio-emerald" />}
          <span className={isReduced ? 'text-cardio-red' : 'text-cardio-sky'}>
            Guideline-Directed Management Strategy (AHA / ACC / ESC):
          </span>
        </div>
        <p className="text-xs text-slate-200 font-sans leading-relaxed">
          {currentCase.recommendation}
        </p>
      </div>

    </div>
  );
};
