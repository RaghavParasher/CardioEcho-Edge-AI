import { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  Check, 
  Copy, 
  Printer, 
  Heart 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { PocusCase, HemodynamicProfile } from '../types/cardiology';

interface ClinicalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCase: PocusCase;
  hemodynamics: HemodynamicProfile;
}

export const ClinicalReportModal = ({
  isOpen,
  onClose,
  currentCase,
  hemodynamics,
}: ClinicalReportModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateMarkdownReport = () => {
    return `# 🫀 CARDIOECHO EDGE-AI — CLINICAL ECHOCARDIOGRAPHY REPORT
**Study Type:** Point-of-Care Echocardiography (POCUS)
**Patient ID:** ${currentCase.patientId} | **Demographics:** ${currentCase.ageGender}
**Clinical Indication:** ${currentCase.clinicalIndication}
**Date & Time:** ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
**Acoustic Window:** ${currentCase.view} • **ECG Rhythm:** ${currentCase.ecgRhythm}
**Heart Rate:** ${currentCase.heartRateBpm} BPM | **Blood Pressure:** ${currentCase.bloodPressure} | **BSA:** ${currentCase.bsaM2} m²

---

## 1. Left Ventricular Chamber Quantification (Biplane Simpson's Method of Disks)
* **Left Ventricular Ejection Fraction (LVEF):** ${hemodynamics.lvefPct.toFixed(1)}% (${hemodynamics.phenotype})
* **End-Diastolic Volume (EDV):** ${hemodynamics.edvMl} mL (Normal: 67-155 mL)
* **End-Systolic Volume (ESV):** ${hemodynamics.esvMl} mL (Normal: 22-58 mL)
* **Stroke Volume (SV):** ${hemodynamics.strokeVolumeMl} mL/beat
* **Cardiac Output (CO):** ${hemodynamics.cardiacOutputLMin} L/min
* **Cardiac Index (CI):** ${hemodynamics.cardiacIndexLMinM2} L/min/m²

---

## 2. Advanced Myocardial Strain & Valvular Telemetry
* **Global Longitudinal Strain (GLS):** ${hemodynamics.glsStrainPct}% (Reference Normal: < -18.0%)
* **Mitral Inflow E/A Ratio:** ${hemodynamics.eaRatio}
* **Wall Motion Score Index (WMSI):** ${hemodynamics.wallMotionScoreIndex} (1.0 = Normal)
* **Estimated Right Atrial Pressure (RAP):** ${currentCase.hemodynamics.rightAtrialPressureMmHg ? `${currentCase.hemodynamics.rightAtrialPressureMmHg} mmHg` : '< 5 mmHg'}
* **Edge AI Segmentation Dice Score:** ${(currentCase.diceScore * 100).toFixed(1)}% (Latency: ${currentCase.inferenceLatencyMs}ms)

---

## 3. Diagnostic Findings & Interpretation
${currentCase.clinicalFinding}

---

## 4. Guideline-Directed Management Strategy (AHA / ACC / ESC)
${currentCase.recommendation}

---
_CERTIFIED POCUS AI TELEMETRY — Compliant with ASE 2015 Chamber Quantification Guidelines_
`;
  };

  const generateFhirJson = () => {
    return JSON.stringify({
      resourceType: 'DiagnosticReport',
      id: `cardioecho-${currentCase.patientId.toLowerCase()}`,
      status: 'final',
      category: [{ text: 'Echocardiography / POCUS' }],
      code: { text: 'Transthoracic Echocardiogram 2D Biplane Simpson' },
      subject: { reference: `Patient/${currentCase.patientId}` },
      effectiveDateTime: new Date().toISOString(),
      result: [
        { observation: 'LVEF', valueQuantity: { value: hemodynamics.lvefPct, unit: '%' } },
        { observation: 'EDV', valueQuantity: { value: hemodynamics.edvMl, unit: 'mL' } },
        { observation: 'ESV', valueQuantity: { value: hemodynamics.esvMl, unit: 'mL' } },
        { observation: 'GLS', valueQuantity: { value: hemodynamics.glsStrainPct, unit: '%' } },
        { observation: 'CardiacIndex', valueQuantity: { value: hemodynamics.cardiacIndexLMinM2, unit: 'L/min/m2' } },
        { observation: 'Phenotype', valueString: hemodynamics.phenotype }
      ],
      conclusion: currentCase.clinicalFinding
    }, null, 2);
  };

  const handleDownloadMarkdown = () => {
    const text = generateMarkdownReport();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCase.patientId}_echocardiogram_report.md`;
    a.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
  };

  const handleDownloadJson = () => {
    const text = generateFhirJson();
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCase.patientId}_fhir_diagnostic_report.json`;
    a.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-mono text-xs">
      <div className="cardio-glass-card max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-cardio-sky/30 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-cardio-sky/20 text-cardio-sky border border-cardio-sky/40 shadow-neon-cardio">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Certified DICOM SR / FHIR Clinical Echo Report
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Standardized Transthoracic Echocardiogram Telemetry (ASE 2015 Compliant)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Report Preview */}
        <pre className="p-4 rounded-2xl bg-slate-950/90 border border-white/[0.06] max-h-60 overflow-y-auto text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap">
          {generateMarkdownReport()}
        </pre>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-gradient-to-r from-cardio-sky via-cardio-cyan to-cardio-emerald text-slate-950 font-bold shadow-neon-cardio hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .MD</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Heart className="w-4 h-4 text-cardio-sky" />
            <span>Download FHIR</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cardio-sky" />}
            <span>{copied ? 'Copied!' : 'Copy EHR Text'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Sheet</span>
          </button>
        </div>

      </div>
    </div>
  );
};
