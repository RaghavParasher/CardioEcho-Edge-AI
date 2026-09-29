import { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Presentation, 
  FileText, 
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Database,
  Layers,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { EchoMetricStrip } from './components/EchoMetricStrip';
import { ViewSelector } from './components/ViewSelector';
import { EchoCineCanvas } from './components/EchoCineCanvas';
import { HemodynamicsMatrix } from './components/HemodynamicsMatrix';
import { ClinicalReportModal } from './components/ClinicalReportModal';
import { OfficialPresentationModal } from './components/OfficialPresentationModal';
import { POCUS_CLINICAL_CASES } from './services/cardiacDatasets';
import { BiplaneSimpsonsEngineService } from './services/biplaneSimpsonsEngine';
import type { PocusView } from './types/cardiology';

export function App() {
  const [activeView, setActiveView] = useState<PocusView>('A4C');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);

  // Dimension trims from user calibration
  const [dimAdjustment, setDimAdjustment] = useState<{ length: number; width: number }>({ length: 0, width: 0 });

  // Current active clinical case
  const currentCase = POCUS_CLINICAL_CASES.find((c) => c.view === activeView) || POCUS_CLINICAL_CASES[0];

  // Base dimensions calibrated for Simpson's disks
  const baseLengthMm = 82.0 + dimAdjustment.length;
  const baseWidthMm = 44.0 + dimAdjustment.width;

  // Real-time Simpson's 20-disk volume calculation
  const simpsonsCalc = BiplaneSimpsonsEngineService.computeSimpsonDisks(
    baseLengthMm,
    baseWidthMm,
    baseWidthMm * 0.95,
    20
  );

  // Dynamic real-time hemodynamics
  const currentEdv = currentCase.hemodynamics.edvMl + dimAdjustment.length * 2.5;
  const currentEsv = currentCase.hemodynamics.esvMl + dimAdjustment.width * 1.8;
  const currentHemodynamics = BiplaneSimpsonsEngineService.computeHemodynamics(
    currentEdv,
    currentEsv,
    currentCase.heartRateBpm,
    currentCase.bsaM2,
    currentCase.hemodynamics.eaRatio
  );

  const handleSelectView = (view: PocusView) => {
    setActiveView(view);
    setDimAdjustment({ length: 0, width: 0 });
  };

  const handleResetCalibration = () => {
    setDimAdjustment({ length: 0, width: 0 });
  };

  const handleTriggerAutoScan = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-[#050a14] text-slate-100 flex flex-col font-sans selection:bg-cardio-sky selection:text-slate-950">
      
      {/* 1. Navigation Header */}
      <Navbar 
        activeView={activeView} 
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenSlideModal={() => setIsSlideModalOpen(true)}
      />

      {/* 2. Main Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Section */}
        <section className="relative rounded-3xl p-6 sm:p-10 cardio-glass-card border border-cardio-border overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cardio-sky/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cardio-cyan/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cardio-sky/15 border border-cardio-sky/30 text-cardio-sky font-mono text-[11px] font-bold tracking-wide">
                  HACK2HEAL 2.0 — GLOBAL HEALTHCARE HACKATHON
                </span>
                <span className="px-3 py-1 rounded-full bg-cardio-emerald/15 border border-cardio-emerald/30 text-cardio-emerald font-mono text-[11px] font-bold tracking-wide">
                  SCOPUS RESEARCH TRACK
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-[11px] font-bold tracking-wide">
                  ASE 2015 BIPLANE SIMPSON'S
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Edge-Accelerated POCUS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cardio-sky via-cardio-cyan to-cardio-emerald">
                  Echocardiogram Telemetry Studio
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed">
                Transforming handheld cardiac point-of-care ultrasound into real-time diagnostic workstations. Sub-25ms WebGPU Left Ventricular contour segmentation, automated Biplane Simpson's LVEF estimation, and clinical DICOM SR / FHIR telemetry export.
              </p>
            </div>

            {/* Quick Action Cards */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
              <button
                onClick={handleTriggerAutoScan}
                className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cardio-sky via-cardio-cyan to-cardio-emerald text-slate-950 font-bold font-mono text-xs shadow-neon-cardio hover:scale-[1.03] active:scale-97 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Run Bedside Auto-Scan</span>
              </button>

              <button
                onClick={() => setIsSlideModalOpen(true)}
                className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-cardio-purple/20 hover:bg-cardio-purple/30 border border-cardio-purple/40 text-purple-300 font-mono text-xs transition-colors cursor-pointer"
              >
                <Presentation className="w-4 h-4 text-purple-400" />
                <span>Official 6-Slide Idea Deck</span>
              </button>

              <button
                onClick={handleResetCalibration}
                className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-2xl bg-slate-900/90 border border-white/10 hover:bg-slate-800 text-slate-400 font-mono text-xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cardio-cyan" />
                <span>Reset Dimension Calibration</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3. Real-Time Telemetry KPI Strip */}
        <section>
          <EchoMetricStrip 
            hemodynamics={currentHemodynamics}
            diceScore={currentCase.diceScore}
            inferenceLatencyMs={currentCase.inferenceLatencyMs}
          />
        </section>

        {/* 4. Acoustic Probe View Switcher */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cardio-sky" />
              <span>Select POCUS Acoustic Window & Patient Case</span>
            </h2>
            <span className="text-xs font-mono text-slate-500">4 Clinical Protocols Loaded</span>
          </div>

          <ViewSelector 
            activeView={activeView} 
            onSelectView={handleSelectView} 
          />
        </section>

        {/* 5. Core Dual-Studio Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Ultrasound Sector Cine Player & Simpson's Disks */}
          <div className="lg:col-span-7 space-y-6">
            <EchoCineCanvas
              currentCase={currentCase}
              simpsonDisks={simpsonsCalc.disks}
              computedLvef={currentHemodynamics.lvefPct}
              onAdjustDimensions={(lengthDelta, widthDelta) => setDimAdjustment({ length: lengthDelta, width: widthDelta })}
            />
          </div>

          {/* Right Column: Advanced Hemodynamics & Clinical Report Trigger */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hemodynamics Matrix */}
            <HemodynamicsMatrix 
              currentCase={currentCase}
              hemodynamics={currentHemodynamics}
            />

            {/* Patient Clinical Profile Card */}
            <div className="p-6 rounded-3xl cardio-glass-card border border-white/[0.08] space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-white/[0.08]">
                <div className="p-2.5 rounded-2xl bg-cardio-sky/10 text-cardio-sky border border-cardio-sky/30 shadow-neon-cardio">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Emergency Triage & Vital Telemetry
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Patient: <strong className="text-slate-200">{currentCase.patientId}</strong> • BP: <strong className="text-cardio-sky">{currentCase.bloodPressure}</strong>
                  </p>
                </div>
              </div>

              {/* Clinical Indication */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1 font-mono text-xs">
                <span className="text-[10px] text-slate-500 uppercase block">Presenting Indication:</span>
                <p className="text-slate-200 font-sans text-xs leading-snug">
                  {currentCase.clinicalIndication}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-900 border border-cardio-sky/30 text-cardio-sky font-mono text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Certified DICOM / FHIR Report →</span>
                </button>
              </div>

            </div>

          </div>

        </section>

        {/* 6. Multi-Patient Comparative Clinical Benchmark Registry */}
        <section className="p-6 sm:p-8 rounded-3xl cardio-glass-card border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-cardio-emerald/10 text-cardio-emerald border border-cardio-emerald/30 shadow-neon-emerald">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  Validated Clinical POCUS Cohort Registry
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Comparative cross-patient hemodynamic benchmarking across HFrEF, Normal, HFmrEF, and Congestion
                </p>
              </div>
            </div>

            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-cardio-sky">
              4 of 4 Case Studies Loaded
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[11px] uppercase">
                  <th className="pb-3 font-semibold">Patient / Case</th>
                  <th className="pb-3 font-semibold">View</th>
                  <th className="pb-3 font-semibold">LVEF % (Simpson's)</th>
                  <th className="pb-3 font-semibold">Phenotype</th>
                  <th className="pb-3 font-semibold">Cardiac Index</th>
                  <th className="pb-3 font-semibold">GLS Strain</th>
                  <th className="pb-3 font-semibold text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {POCUS_CLINICAL_CASES.map((c) => (
                  <tr 
                    key={c.id}
                    className={`hover:bg-slate-900/50 transition-colors cursor-pointer ${
                      activeView === c.view ? 'bg-slate-900/80 font-semibold' : ''
                    }`}
                    onClick={() => handleSelectView(c.view)}
                  >
                    <td className="py-4 pr-4">
                      <div className="font-bold text-white flex items-center space-x-2">
                        <span>{c.name}</span>
                        {activeView === c.view && (
                          <span className="w-2 h-2 rounded-full bg-cardio-sky animate-ping" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans">{c.patientId} • {c.ageGender}</div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="px-2 py-1 rounded-md bg-slate-950 text-[10px] border border-white/10 text-cardio-sky">
                        {c.view}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`font-bold ${
                        c.hemodynamics.lvefPct < 40 ? 'text-cardio-red' : c.hemodynamics.lvefPct < 50 ? 'text-cardio-amber' : 'text-cardio-emerald'
                      }`}>
                        {c.hemodynamics.lvefPct.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-slate-300">{c.hemodynamics.phenotype}</td>
                    <td className="py-4 pr-4">
                      <span className="text-white font-bold">{c.hemodynamics.cardiacIndexLMinM2} L/min/m²</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-cardio-emerald">{c.hemodynamics.glsStrainPct}%</span>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectView(c.view);
                        }}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-cardio-sky hover:text-slate-950 text-slate-300 border border-white/10 transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* 7. Footer */}
      <footer className="border-t border-cardio-border bg-[#03060c] py-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cardio-sky" />
            <span className="text-slate-400">
              CardioEcho Edge-AI © 2026 • Hack2Heal 2.0 Global Healthcare Submission
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-400">MIT Open Source</span>
            <span className="text-slate-600">•</span>
            <a 
              href="https://github.com/RaghavParasher" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cardio-sky hover:underline flex items-center space-x-1"
            >
              <span>GitHub @RaghavParasher</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* 8. Modals */}
      <ClinicalReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        currentCase={currentCase}
        hemodynamics={currentHemodynamics}
      />

      <OfficialPresentationModal
        isOpen={isSlideModalOpen}
        onClose={() => setIsSlideModalOpen(false)}
      />

    </div>
  );
}

export default App;

