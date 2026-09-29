export type PocusView = 'A4C' | 'PLAX' | 'A2C' | 'IVC';

export type CardiacPhenotype = 
  | 'Normal (Preserved EF)'
  | 'HFrEF (Heart Failure with Reduced EF)'
  | 'HFmrEF (Mildly Reduced EF)'
  | 'HFpEF (Preserved EF with Diastolic Dysfunction)';

export interface SimpsonsDisk {
  index: number;
  diameterA4cMm: number;
  diameterA2cMm: number;
  heightMm: number;
  volumeMl: number;
}

export interface HemodynamicProfile {
  edvMl: number; // End-Diastolic Volume (mL)
  esvMl: number; // End-Systolic Volume (mL)
  strokeVolumeMl: number; // SV = EDV - ESV (mL)
  cardiacOutputLMin: number; // CO = SV * HR / 1000 (L/min)
  cardiacIndexLMinM2: number; // CI = CO / BSA (L/min/m2)
  lvefPct: number; // Ejection Fraction %
  glsStrainPct: number; // Global Longitudinal Strain %
  eaRatio: number; // Mitral Inflow E/A wave velocity ratio
  wallMotionScoreIndex: number; // 1.0 (Normal) to 3.0 (Akinetic)
  rightAtrialPressureMmHg?: number; // Estimated RAP via IVC
  ivcCollapsibilityPct?: number; // IVC respiratory collapsibility %
  phenotype: CardiacPhenotype;
}

export interface ContourPoint {
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
}

export interface PocusCase {
  id: string;
  view: PocusView;
  name: string;
  patientId: string;
  ageGender: string;
  clinicalIndication: string;
  heartRateBpm: number;
  bloodPressure: string;
  bsaM2: number; // Body surface area (m2)
  hemodynamics: HemodynamicProfile;
  diceScore: number;
  inferenceLatencyMs: number;
  ecgRhythm: string;
  contourDiastole: ContourPoint[];
  contourSystole: ContourPoint[];
  dopplerPoints: { time: number; velocity: number }[];
  clinicalFinding: string;
  recommendation: string;
}

export interface Hack2HealSlide {
  slideNumber: number;
  title: string;
  subtitle: string;
  bullets: { label: string; text: string }[];
  highlightBadge: string;
  diagramTitle?: string;
  diagramItems?: string[];
}
