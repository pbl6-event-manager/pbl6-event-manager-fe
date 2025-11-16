export const computeNiceTicks = (maxValue: number, desiredCount = 4) => {
    const range = Math.max(1, Math.ceil(maxValue));
    const rawStep = range / Math.max(1, desiredCount);
    const exp = Math.floor(Math.log10(rawStep));
    const frac = rawStep / Math.pow(10, exp);
    let niceFrac = 1;
    if (frac <= 1) niceFrac = 1;
    else if (frac <= 2) niceFrac = 2;
    else if (frac <= 5) niceFrac = 5;
    else niceFrac = 10;
    let step = Math.round(niceFrac * Math.pow(10, exp));
    if (step < 1) step = 1;
    const maxTick = Math.ceil(range / step) * step;
    const count = Math.round(maxTick / step);
    const values = Array.from({ length: count + 1 }, (_, i) => i * step);
    return { values, step, maxTick };
  };