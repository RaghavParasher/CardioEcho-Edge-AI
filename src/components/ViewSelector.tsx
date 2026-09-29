import { 
  Maximize2, 
  Activity, 
  Flame, 
  Compass,
  type LucideIcon
} from 'lucide-react';
import type { PocusView } from '../types/cardiology';

interface ViewSelectorProps {
  activeView: PocusView;
  onSelectView: (view: PocusView) => void;
}

export const ViewSelector = ({
  activeView,
  onSelectView,
}: ViewSelectorProps) => {
  const views: { id: PocusView; label: string; tag: string; description: string; icon: LucideIcon }[] = [
    {
      id: 'A4C',
      label: 'Apical 4-Chamber (A4C)',
      tag: 'Biplane Primary',
      description: "Golden standard for Left & Right ventricle/atria volume & Simpson's Biplane ejection fraction.",
      icon: Activity,
    },
    {
      id: 'PLAX',
      label: 'Parasternal Long Axis (PLAX)',
      tag: 'Anterior / Posterior',
      description: 'Visualizes aortic root, mitral valve leaflet excursion, and LV posterior wall thickness.',
      icon: Maximize2,
    },
    {
      id: 'A2C',
      label: 'Apical 2-Chamber (A2C)',
      tag: 'Biplane Orthogonal',
      description: "Orthogonal 90-degree view evaluating anterior & inferior wall segments and Biplane Simpson's pairing.",
      icon: Flame,
    },
    {
      id: 'IVC',
      label: 'Subcostal IVC View',
      tag: 'Congestion & Volume',
      description: 'Assesses Inferior Vena Cava respiratory collapsibility index and Right Atrial Pressure (RAP).',
      icon: Compass,
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {views.map((v) => {
        const isActive = activeView === v.id;
        const Icon = v.icon;

        return (
          <button
            key={v.id}
            onClick={() => onSelectView(v.id)}
            className={`p-5 rounded-3xl border transition-all text-left space-y-3 relative overflow-hidden group hover:scale-[1.02] active:scale-98 cursor-pointer ${
              isActive
                ? 'bg-slate-900/95 border-cardio-sky ring-1 ring-cardio-sky shadow-neon-cardio'
                : 'bg-slate-900/60 border-white/[0.08] hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-2xl ${
                isActive
                  ? 'bg-cardio-sky text-slate-950 shadow-neon-cardio'
                  : 'bg-slate-950 text-slate-400 border border-white/5'
              }`}>
                <Icon className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-white/5">
                {v.tag}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white font-display">
                {v.label}
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-sans leading-snug line-clamp-2">
                {v.description}
              </p>
            </div>

            <div className="pt-2 border-t border-white/[0.04] text-[10px] font-mono text-cardio-cyan group-hover:underline">
              {isActive ? '● Live Telemetry Active' : 'Switch Acoustic Probe Window →'}
            </div>
          </button>
        );
      })}
    </div>
  );
};

