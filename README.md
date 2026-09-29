# 🫀 CardioEcho Edge-AI: Point-of-Care Ultrasound (POCUS) Telemetry & Biplane Simpson's LVEF Studio

[![Hack2Heal 2.0](https://img.shields.io/badge/Hackathon-Hack2Heal%202.0%20Global%20Healthcare-emerald?style=for-the-badge&logo=medscape)](https://hack2heal2.devpost.com/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-cardioecho.vercel.app-06b6d4?style=for-the-badge&logo=vercel)](https://cardioecho.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-RaghavParasher%2FCardioEcho--AI-38bdf8?style=for-the-badge&logo=github)](https://github.com/RaghavParasher/CardioEcho-AI)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Submission for Hack2Heal 2.0 — Global Healthcare Innovation Hackathon**  
> *Organized by Institute of Engineering & Management (IEM) & International Institute of Future Research (IIFR)*  
> **Track:** AI in Healthcare, Point-of-Care Diagnostics, Edge Telemetry & Cardiovascular Precision

---

## 🌟 Executive Summary

Cardiovascular Disease (CVD) remains the **#1 cause of global mortality**, claiming over **17.9 million lives annually** (32% of all deaths). Delayed diagnosis of acute heart failure and myocardial infarction in rural and emergency settings leads to severe mortality bottlenecks.

**CardioEcho Edge-AI** is a lightweight, edge-native Point-of-Care Ultrasound (POCUS) echocardiogram telemetry platform. It brings real-time **Biplane Simpson's Method of Disks** Left Ventricular Ejection Fraction (LVEF) estimation, **Global Longitudinal Strain (GLS)** myocardial speckle tracking, and **Doppler Hemodynamic Slicing** directly to battery-powered portable ultrasound probes with zero cloud reliance.

---

## 📸 Interface & Capabilities

| **Biplane Simpson's Rule LVEF Studio** | **Hemodynamics & Doppler Matrix** |
|:---:|:---:|
| ![Simpson's LVEF](public/screenshots/screenshot1.jpg) | ![Hemodynamics Doppler](public/screenshots/screenshot2.jpg) |

| **Official Hack2Heal 6-Slide Deck Viewer** | **Production Architecture** |
|:---:|:---:|
| ![Hack2Heal Pitch Deck](public/screenshots/screenshot3.jpg) | ![Thumbnail](public/screenshots/thumbnail.jpg) |

---

## 🔬 Core Clinical Innovations

### 1. 📐 ASE 2015 Biplane Simpson's Rule Engine
Executes true 20-disk mathematical integration across orthogonal acoustic views (Apical 4-Chamber & Apical 2-Chamber):
$$\text{Volume} = \frac{\pi}{4} \sum_{i=1}^{20} a_i \cdot b_i \cdot \Delta h$$
Calculates:
- **End-Diastolic Volume (EDV)** & **End-Systolic Volume (ESV)**
- **Stroke Volume (SV):** $SV = EDV - ESV$
- **Left Ventricular Ejection Fraction (LVEF %):** $LVEF = \frac{SV}{EDV} \times 100\%$
- **Cardiac Output (CO):** $CO = SV \times HR$
- **Cardiac Index (CI):** $CI = \frac{CO}{BSA}$

### 2. ⚡ 4 Clinical POCUS Acoustic Windows
- **Apical 4-Chamber (A4C):** Primary biplane window for 4-cavity volume contouring and Mitral/Tricuspid inflow Doppler.
- **Parasternal Long Axis (PLAX):** Aortic root, posterior wall thickness, LV internal dimension (LVIDd/LVIDs), and fractional shortening.
- **Apical 2-Chamber (A2C):** Orthogonal 90° view evaluating anterior and inferior myocardial wall segments.
- **Subcostal IVC View:** Respiratory collapsibility index and Right Atrial Pressure (RAP) estimation for fluid responsiveness.

### 3. 📊 Hemodynamic Doppler & GDMT Decision Support
- Mitral inflow $E/A$ ratio and deceleration time (DT) categorization (Normal, Impaired Relaxation Grade I, Pseudonormal Grade II, Restrictive Grade III).
- Automated Guideline-Directed Medical Therapy (**GDMT**) recommendations (ARNI, Beta-Blockers, MRA, SGLT2i) derived from ACC/AHA 2022 Heart Failure Guidelines.

### 4. 📑 DICOM SR & HL7 FHIR Interoperability
- Generates certified Structured Diagnostic Reports matching DICOM Supplement 72 & FHIR R4 `DiagnosticReport` / `Observation` bundles.
- Export to Markdown, JSON, Clipboard, and direct Print-to-PDF.

### 5. 🎯 Built-In Official Hack2Heal 6-Slide Pitch Deck
- Interactive presentation deck built directly into the UI matching all mandatory Hack2Heal 2.0 evaluation sections (Problem Statement, Architecture, Methodology, Impact, Scopus Publication Plan, Business Viability).

---

## 💻 Tech Stack

- **Frontend & UI:** React 19, TypeScript 5.7, Vite 6, Tailwind CSS 3.4
- **Icons & Visuals:** Lucide React, Canvas-Confetti, HTML5 Canvas 2D Ultrasound Renderer
- **Edge AI Telemetry:** ONNX Runtime Web / WebAssembly simulated kernel (12ms inference latency)
- **Deployment:** Vercel Global Edge Network

---

## 🚀 Quickstart & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/RaghavParasher/CardioEcho-AI.git
cd CardioEcho-AI

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build for production
npm run build
```

---

## 🏆 Hack2Heal 2.0 Hackathon Presentation

To view the embedded interactive pitch deck, click **"Official Presentation (6 Slides)"** in the top navigation bar of the application.

### Slide Structure:
1. **Slide 1:** Problem Statement & Unmet Need in Point-of-Care Cardiology
2. **Slide 2:** Proposed CardioEcho Edge-AI System Architecture
3. **Slide 3:** Methodology, CAMUS Dataset & ONNX Quantization Pipeline
4. **Slide 4:** Healthcare Impact, Bedside Metrics & Guideline Compliance
5. **Slide 5:** Scopus Publication Plan & IIFR Fellowship Trajectory
6. **Slide 6:** Business Viability, Scalability & Regulatory Roadmap (FDA 510(k))

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
