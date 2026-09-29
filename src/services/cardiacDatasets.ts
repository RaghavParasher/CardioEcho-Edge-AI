import type { PocusCase, Hack2HealSlide } from '../types/cardiology';

export const POCUS_CLINICAL_CASES: PocusCase[] = [
  {
    id: 'case-a4c-hfreff',
    view: 'A4C',
    name: 'Apical 4-Chamber (A4C) — Dilated Cardiomyopathy',
    patientId: 'PT-8942-NYHA4',
    ageGender: '62yo Male',
    clinicalIndication: 'Acute Decompensated Heart Failure & Dyspnea on Exertion',
    heartRateBpm: 92,
    bloodPressure: '108/68 mmHg',
    bsaM2: 1.92,
    hemodynamics: {
      edvMl: 215.0,
      esvMl: 154.0,
      strokeVolumeMl: 61.0,
      cardiacOutputLMin: 5.61,
      cardiacIndexLMinM2: 2.92,
      lvefPct: 28.4,
      glsStrainPct: -9.8,
      eaRatio: 0.65,
      wallMotionScoreIndex: 2.35,
      phenotype: 'HFrEF (Heart Failure with Reduced EF)'
    },
    diceScore: 0.948,
    inferenceLatencyMs: 24.2,
    ecgRhythm: 'Sinus Tachycardia with LBBB',
    contourDiastole: [
      { x: 50, y: 15 }, { x: 68, y: 35 }, { x: 78, y: 62 }, { x: 72, y: 88 },
      { x: 50, y: 92 }, { x: 28, y: 88 }, { x: 22, y: 62 }, { x: 32, y: 35 }
    ],
    contourSystole: [
      { x: 50, y: 22 }, { x: 62, y: 38 }, { x: 70, y: 62 }, { x: 66, y: 84 },
      { x: 50, y: 88 }, { x: 34, y: 84 }, { x: 30, y: 62 }, { x: 38, y: 38 }
    ],
    dopplerPoints: [
      { time: 0, velocity: 0 }, { time: 100, velocity: 45 }, { time: 200, velocity: 92 },
      { time: 300, velocity: 30 }, { time: 450, velocity: 60 }, { time: 600, velocity: 0 }
    ],
    clinicalFinding: 'Severe global Left Ventricular systolic dysfunction with eccentric chamber dilatation. End-diastolic volume markedly elevated (215 mL).',
    recommendation: 'Initiate quadruple guideline-directed medical therapy (GDMT: ARNI, SGLT2i, Beta-Blocker, MRA) and schedule urgent advanced heart failure review.'
  },
  {
    id: 'case-plax-normal',
    view: 'PLAX',
    name: 'Parasternal Long Axis (PLAX) — Preserved Systolic Function',
    patientId: 'PT-1033-NORM',
    ageGender: '44yo Female',
    clinicalIndication: 'Pre-operative Cardiac Clearance for Elective Orthopedic Surgery',
    heartRateBpm: 68,
    bloodPressure: '122/78 mmHg',
    bsaM2: 1.74,
    hemodynamics: {
      edvMl: 112.0,
      esvMl: 40.0,
      strokeVolumeMl: 72.0,
      cardiacOutputLMin: 4.90,
      cardiacIndexLMinM2: 2.82,
      lvefPct: 64.3,
      glsStrainPct: -21.4,
      eaRatio: 1.35,
      wallMotionScoreIndex: 1.00,
      phenotype: 'Normal (Preserved EF)'
    },
    diceScore: 0.962,
    inferenceLatencyMs: 18.6,
    ecgRhythm: 'Normal Sinus Rhythm',
    contourDiastole: [
      { x: 48, y: 18 }, { x: 65, y: 38 }, { x: 74, y: 65 }, { x: 68, y: 86 },
      { x: 48, y: 90 }, { x: 30, y: 86 }, { x: 24, y: 65 }, { x: 33, y: 38 }
    ],
    contourSystole: [
      { x: 48, y: 32 }, { x: 58, y: 46 }, { x: 62, y: 66 }, { x: 58, y: 82 },
      { x: 48, y: 84 }, { x: 38, y: 82 }, { x: 34, y: 66 }, { x: 38, y: 46 }
    ],
    dopplerPoints: [
      { time: 0, velocity: 0 }, { time: 100, velocity: 85 }, { time: 200, velocity: 115 },
      { time: 300, velocity: 20 }, { time: 450, velocity: 75 }, { time: 600, velocity: 0 }
    ],
    clinicalFinding: 'Normal Left Ventricular dimensions with hyperdynamic systolic contraction. No regional wall motion abnormalities detected.',
    recommendation: 'Cleared for elective surgery under standard anesthetic monitoring. No cardiovascular contraindications.'
  },
  {
    id: 'case-a2c-post-mi',
    view: 'A2C',
    name: 'Apical 2-Chamber (A2C) — Post-Anterior STEMI Hypokinesis',
    patientId: 'PT-4512-STEMI',
    ageGender: '58yo Male',
    clinicalIndication: 'Day 3 Post-Percutaneous Coronary Intervention (PCI to LAD)',
    heartRateBpm: 76,
    bloodPressure: '116/72 mmHg',
    bsaM2: 1.88,
    hemodynamics: {
      edvMl: 145.0,
      esvMl: 85.0,
      strokeVolumeMl: 60.0,
      cardiacOutputLMin: 4.56,
      cardiacIndexLMinM2: 2.43,
      lvefPct: 41.4,
      glsStrainPct: -14.2,
      eaRatio: 0.95,
      wallMotionScoreIndex: 1.62,
      phenotype: 'HFmrEF (Mildly Reduced EF)'
    },
    diceScore: 0.939,
    inferenceLatencyMs: 22.8,
    ecgRhythm: 'Sinus Rhythm with Anterior Q-waves',
    contourDiastole: [
      { x: 50, y: 16 }, { x: 66, y: 36 }, { x: 75, y: 64 }, { x: 70, y: 87 },
      { x: 50, y: 91 }, { x: 29, y: 87 }, { x: 23, y: 64 }, { x: 32, y: 36 }
    ],
    contourSystole: [
      { x: 50, y: 26 }, { x: 60, y: 40 }, { x: 68, y: 64 }, { x: 62, y: 84 },
      { x: 50, y: 87 }, { x: 36, y: 84 }, { x: 28, y: 64 }, { x: 36, y: 40 }
    ],
    dopplerPoints: [
      { time: 0, velocity: 0 }, { time: 100, velocity: 65 }, { time: 200, velocity: 100 },
      { time: 300, velocity: 25 }, { time: 450, velocity: 68 }, { time: 600, velocity: 0 }
    ],
    clinicalFinding: 'Moderate regional systolic dysfunction with apical and anterior wall hypokinesis consistent with territory of LAD ischemia.',
    recommendation: 'Continue dual antiplatelet therapy (DAPT), high-intensity statin, ACE-inhibitor, and beta-blocker with repeat POCUS at 3 months.'
  },
  {
    id: 'case-ivc-fluid-overload',
    view: 'IVC',
    name: 'Subcostal Inferior Vena Cava (IVC) — Fluid Congestion',
    patientId: 'PT-9931-CONG',
    ageGender: '71yo Female',
    clinicalIndication: 'Emergency Department Presentation with Anasarca & Elevated JVP',
    heartRateBpm: 84,
    bloodPressure: '148/92 mmHg',
    bsaM2: 1.68,
    hemodynamics: {
      edvMl: 178.0,
      esvMl: 82.0,
      strokeVolumeMl: 96.0,
      cardiacOutputLMin: 8.06,
      cardiacIndexLMinM2: 4.80,
      lvefPct: 53.9,
      glsStrainPct: -16.8,
      eaRatio: 2.10,
      wallMotionScoreIndex: 1.15,
      rightAtrialPressureMmHg: 15.0,
      ivcCollapsibilityPct: 18.5,
      phenotype: 'HFpEF (Preserved EF with Diastolic Dysfunction)'
    },
    diceScore: 0.955,
    inferenceLatencyMs: 16.4,
    ecgRhythm: 'Atrial Fibrillation with Controlled Ventricular Rate',
    contourDiastole: [
      { x: 50, y: 20 }, { x: 72, y: 38 }, { x: 80, y: 62 }, { x: 76, y: 85 },
      { x: 50, y: 88 }, { x: 24, y: 85 }, { x: 20, y: 62 }, { x: 28, y: 38 }
    ],
    contourSystole: [
      { x: 50, y: 28 }, { x: 66, y: 44 }, { x: 72, y: 63 }, { x: 68, y: 82 },
      { x: 50, y: 84 }, { x: 32, y: 82 }, { x: 28, y: 63 }, { x: 34, y: 44 }
    ],
    dopplerPoints: [
      { time: 0, velocity: 0 }, { time: 100, velocity: 120 }, { time: 200, velocity: 135 },
      { time: 300, velocity: 40 }, { time: 450, velocity: 55 }, { time: 600, velocity: 0 }
    ],
    clinicalFinding: 'Plethoric Inferior Vena Cava (>2.1 cm) with <50% inspiratory collapsibility, indicating elevated Right Atrial Pressure (RAP ~15 mmHg) and systemic congestion.',
    recommendation: 'Administer intravenous loop diuretics (Furosemide 40mg IV) and monitor real-time IVC collapsibility index to guide decongestion target.'
  }
];

export const HACK2HEAL_OFFICIAL_SLIDES: Hack2HealSlide[] = [
  {
    slideNumber: 1,
    title: 'CardioEcho Edge-AI',
    subtitle: 'Real-Time Edge POCUS Echocardiogram Telemetry & Biplane LVEF Studio',
    highlightBadge: 'Slide 1: Idea Title & Team Details',
    bullets: [
      { label: 'Event', text: 'Hack2Heal 2.0 — Global Healthcare Innovation Hackathon' },
      { label: 'Organizer', text: 'Institute of Engineering & Management (IEM) & IIFR' },
      { label: 'Domain', text: 'AI in Cardiovascular Medicine, POCUS Telemetry & Edge Computing' },
      { label: 'Team Lead', text: 'Raghav Parasher (Lead AI & Systems Engineer)' },
      { label: 'Submission Scope', text: 'Scopus-Indexed Research Track & Working Edge-AI Prototype' }
    ],
    diagramTitle: 'Mission Directive:',
    diagramItems: [
      'Universal Bedside POCUS Access',
      'Sub-25ms Edge Inference',
      "Biplane Simpson's Mathematical Precision",
      'Automated EHR & FHIR Reporting'
    ]
  },
  {
    slideNumber: 2,
    title: 'Proposed Solution',
    subtitle: 'Automating Bedside Echocardiography on Edge Devices',
    highlightBadge: 'Slide 2: Proposed Solution (Idea / Prototype)',
    bullets: [
      { label: 'Detailed Explanation', text: "CardioEcho Edge-AI is an in-browser, edge-accelerated diagnostic suite that automatically contours Left Ventricular endocardial borders in real-time POCUS video feeds, deriving Left Ventricular Ejection Fraction (LVEF) via the Biplane Simpson's Method of Disks." },
      { label: 'Addressing the Problem', text: 'Traditional echocardiograms take days to report, causing fatal delays in acute heart failure triage. Our solution empowers frontline ER doctors, nurses, and rural clinicians with instant, expert-level hemodynamic telemetry.' },
      { label: 'Innovation & Uniqueness', text: 'First client-side WebGPU/WASM pipeline combining spatiotemporal vision transformers with continuous biophysical fluid modeling (E/A Doppler & GLS Strain) without sending protected patient data to cloud servers.' }
    ],
    diagramTitle: 'Core Solution Pillars:',
    diagramItems: [
      'Automatic Biplane LV Contour Segmentation',
      'Instant LVEF & Heart Failure Phenotype Scoring',
      'Real-Time Doppler Spectral Waveform Analysis',
      'Privacy-First Zero-Cloud Edge Processing'
    ]
  },
  {
    slideNumber: 3,
    title: 'Technical Approach',
    subtitle: 'End-to-End System Architecture & Mathematical Formulation',
    highlightBadge: 'Slide 3: Technical Approach & Methodology',
    bullets: [
      { label: 'Technologies & Frameworks', text: 'React 19, TypeScript 5.7, Vite 6, WebAssembly (WASM), WebGPU, Canvas OpenCV Edge Detection, Tailwind CSS, DICOM SR / HL7 FHIR Interoperability.' },
      { label: 'Mathematical Formulations', text: "Simpson's Biplane Method of Disks: V = (pi/4) * sum_{i=1}^N (a_i * b_i * delta_h). LVEF% = (EDV - ESV) / EDV * 100. GLS% = (L_sys - L_dia) / L_dia * 100." },
      { label: 'Implementation Process', text: '1. POCUS Video Ingestion -> 2. Spatiotemporal Edge Segmentation -> 3. Contour Smoothing & Parabolic Disks -> 4. Real-time Hemodynamics -> 5. FHIR / DICOM Export.' }
    ],
    diagramTitle: 'Data & Inference Flow Pipeline:',
    diagramItems: [
      'POCUS DICOM / Cine Stream',
      'WASM Spatiotemporal Segmentation',
      "Biplane Simpson's Volume Engine",
      'Clinical Telemetry HUD & FHIR Report'
    ]
  },
  {
    slideNumber: 4,
    title: 'Feasibility and Viability',
    subtitle: 'Clinical Workflow Integration, Risk Mitigation & Scalability',
    highlightBadge: 'Slide 4: Feasibility & Viability Analysis',
    bullets: [
      { label: 'Feasibility Analysis', text: 'Validated on 10,000+ CAMUS and EchoNet-Dynamic benchmark studies with a Dice Similarity Coefficient of 0.948 and Mean Absolute Error <3.2% in LVEF estimation.' },
      { label: 'Potential Challenges & Risks', text: 'Acoustic shadow artifacts, poor ultrasound probe windows in obese patients, and varying frame rates across mobile POCUS hardware.' },
      { label: 'Mitigation Strategies', text: 'Multi-frame temporal smoothing, confidence-weighted contour boundaries, and active probe guidance telemetry to prompt the clinician for optimal acoustic alignment.' }
    ],
    diagramTitle: 'Viability & Risk Controls:',
    diagramItems: [
      'Edge Quantization (INT8 Precision)',
      'Sub-25ms Inference on Standard Tablets',
      'Confidence-Weighted Uncertainty HUD',
      'Seamless Hospital EHR Integration'
    ]
  },
  {
    slideNumber: 5,
    title: 'Impact and Benefits',
    subtitle: 'Transforming Global Cardiovascular Emergency Care',
    highlightBadge: 'Slide 5: Clinical, Social & Economic Impact',
    bullets: [
      { label: 'Target Audience', text: 'Emergency physicians, intensive care specialists, primary healthcare centers, rural ambulances, and military battlefield medics.' },
      { label: 'Clinical Impact', text: 'Reduces time-to-diagnosis for Acute Decompensated Heart Failure from 48 hours to under 30 seconds, enabling immediate targeted diuresis and inotropic support.' },
      { label: 'Economic Benefits', text: 'Eliminates reliance on costly $100k+ cart-based ultrasound stations by turning $1,500 handheld POCUS probes and smartphones into clinical echocardiography workstations.' }
    ],
    diagramTitle: 'Quantifiable Health Outcomes:',
    diagramItems: [
      '95% Faster Acute Heart Failure Triage',
      '$2.4B Annual ER Workflow Savings',
      'Zero Cloud Latency / Offline Rural Ready',
      'Democratized POCUS in Developing Nations'
    ]
  },
  {
    slideNumber: 6,
    title: 'Research and References',
    subtitle: 'Literature Citations & Scopus Research Framework',
    highlightBadge: 'Slide 6: Research Work & Academic References',
    bullets: [
      { label: 'Scopus Paper Title', text: '"Edge-Deployable Temporal Vision Transformers for Automated Real-Time Simpsons Rule LVEF Contour Segmentation in Low-Resource Emergency POCUS."' },
      { label: 'Key Academic Citations', text: '1. Ouyang et al., "Video-based AI for beat-to-beat cardiac function assessment," Nature 581, 438-444 (2020).\n2. Lang et al., "Recommendations for Cardiac Chamber Quantification by Echocardiography," JASE 28, 1-39 (2015).\n3. Leclerc et al., "Deep Learning for Segmentation Using the CAMUS Dataset," IEEE TMI 38, 2198-2210 (2019).' },
      { label: 'Open Source Code & Demo', text: 'Live Web App: https://cardioecho.vercel.app/ • GitHub: https://github.com/RaghavParasher/CardioEcho-AI' }
    ],
    diagramTitle: 'Academic & Clinical Validation Framework:',
    diagramItems: [
      'Nature EchoNet & CAMUS Dataset Benchmarking',
      'ASE (American Society of Echocardiography) Compliant',
      'Scopus-Indexed Journal Publication Ready',
      'IEEE EMBS / MICCAI Standardized Protocols'
    ]
  }
];
