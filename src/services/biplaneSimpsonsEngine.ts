import type { SimpsonsDisk, HemodynamicProfile, CardiacPhenotype } from '../types/cardiology';

export class BiplaneSimpsonsEngineService {
  /**
   * Biplane Method of Disks (Simpson''s Rule)
   * Formula: V = (pi / 4) * sum_{i=1}^N (a_i * b_i * delta_h)
   * Where a_i is A4C disk diameter (mm), b_i is A2C disk diameter (mm), and delta_h is slice height (mm)
   */
  static computeSimpsonDisks(
    apexToBaseLengthMm: number,
    baseA4cWidthMm: number,
    baseA2cWidthMm: number,
    numDisks: number = 20
  ): { disks: SimpsonsDisk[]; totalVolumeMl: number } {
    const deltaHMm = apexToBaseLengthMm / numDisks;
    const disks: SimpsonsDisk[] = [];
    let totalVolumeMm3 = 0;

    for (let i = 0; i < numDisks; i++) {
      // Prolate ellipsoid parabolic contour factor
      const normalizedPos = (i + 0.5) / numDisks;
      const widthFactor = Math.sin(normalizedPos * Math.PI);

      const diameterA4c = Math.max(2, baseA4cWidthMm * widthFactor);
      const diameterA2c = Math.max(2, baseA2cWidthMm * widthFactor);

      // Volume of elliptical cylinder disk: (pi/4) * a * b * h
      const diskVolMm3 = (Math.PI / 4) * diameterA4c * diameterA2c * deltaHMm;
      const diskVolMl = diskVolMm3 / 1000.0; // 1 mL = 1000 mm^3

      totalVolumeMm3 += diskVolMm3;
      disks.push({
        index: i + 1,
        diameterA4cMm: parseFloat(diameterA4c.toFixed(1)),
        diameterA2cMm: parseFloat(diameterA2c.toFixed(1)),
        heightMm: parseFloat(deltaHMm.toFixed(1)),
        volumeMl: parseFloat(diskVolMl.toFixed(2)),
      });
    }

    const totalVolumeMl = parseFloat((totalVolumeMm3 / 1000.0).toFixed(1));
    return { disks, totalVolumeMl };
  }

  /**
   * Compute full cardiac hemodynamic profile from EDV, ESV, and vitals
   */
  static computeHemodynamics(
    edvMl: number,
    esvMl: number,
    heartRateBpm: number,
    bsaM2: number = 1.85,
    eaRatio: number = 1.2,
    glsInput?: number
  ): HemodynamicProfile {
    const safeEdv = Math.max(10, edvMl);
    const safeEsv = Math.min(safeEdv - 2, Math.max(5, esvMl));
    const sv = safeEdv - safeEsv; // Stroke volume (mL)
    const lvef = (sv / safeEdv) * 100; // LVEF %
    const co = (sv * heartRateBpm) / 1000.0; // L/min
    const ci = co / bsaM2; // L/min/m2

    // Estimated GLS from LVEF if not explicitly provided
    const gls = glsInput !== undefined ? glsInput : -parseFloat((0.32 * lvef + 2.5).toFixed(1));

    // Phenotype categorization
    let phenotype: CardiacPhenotype = 'Normal (Preserved EF)';
    if (lvef < 40) {
      phenotype = 'HFrEF (Heart Failure with Reduced EF)';
    } else if (lvef >= 40 && lvef < 50) {
      phenotype = 'HFmrEF (Mildly Reduced EF)';
    } else if (lvef >= 50 && eaRatio < 0.8) {
      phenotype = 'HFpEF (Preserved EF with Diastolic Dysfunction)';
    }

    // Wall motion index calculation
    const wmsi = lvef > 55 ? 1.0 : lvef >= 40 ? 1.45 : 2.25;

    return {
      edvMl: parseFloat(safeEdv.toFixed(1)),
      esvMl: parseFloat(safeEsv.toFixed(1)),
      strokeVolumeMl: parseFloat(sv.toFixed(1)),
      cardiacOutputLMin: parseFloat(co.toFixed(2)),
      cardiacIndexLMinM2: parseFloat(ci.toFixed(2)),
      lvefPct: parseFloat(lvef.toFixed(1)),
      glsStrainPct: gls,
      eaRatio: parseFloat(eaRatio.toFixed(2)),
      wallMotionScoreIndex: parseFloat(wmsi.toFixed(2)),
      phenotype,
    };
  }
}
