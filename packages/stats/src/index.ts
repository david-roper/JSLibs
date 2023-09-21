export function sum(arr: number[]): number {
  if (arr.length === 0) {
    return NaN;
  }
  return arr.reduce((prev, current) => prev + current, 0);
}

export function mean(arr: number[]): number {
  if (arr.length === 0) {
    return NaN;
  }
  return sum(arr) / arr.length;
}

export function std(arr: number[], isPopulation = false): number {
  if (arr.length < 2) {
    return NaN;
  }
  const m = mean(arr);

  // Compute the sum of the squared distances to the mean
  const ss = sum(arr.map((k) => (k - m) ** 2));

  const variance = ss / (arr.length - Number(!isPopulation));

  // Returning the standard deviation
  return Math.sqrt(variance);
}

export function linearRegression(arr: [number, number][]): { intercept: number; slope: number; stdErr: number } {
  const n = arr.length;

  // Extract the x and y values into separate arrays
  const x = arr.map((point) => point[0]);
  const y = arr.map((point) => point[1]);

  // Calculate the mean of x and y
  const xMean = x.reduce((sum, val) => sum + val, 0) / n;
  const yMean = y.reduce((sum, val) => sum + val, 0) / n;

  // Calculate the sum of the products of x and y, and the sum of the squared values of x
  let xySum = 0;
  let xSquaredSum = 0;
  for (let i = 0; i < n; i++) {
    xySum += x[i]! * y[i]!;
    xSquaredSum += x[i]! * x[i]!;
  }

  // Calculate the slope and intercept
  const slope = (xySum - n * xMean * yMean) / (xSquaredSum - n * xMean * xMean);
  const intercept = yMean - slope * xMean;

  // Calculate the residuals and the sum of squared residuals
  const residuals = [];
  let residualsSquaredSum = 0;
  for (let i = 0; i < n; i++) {
    const residual = y[i]! - (slope * x[i]! + intercept);
    residuals.push(residual);
    residualsSquaredSum += residual * residual;
  }

  // Calculate the standard error
  const stdErr = Math.sqrt(residualsSquaredSum / (n - 2)) / Math.sqrt(xSquaredSum - n * xMean * xMean);

  // Return an object containing the intercept, slope, and standard error
  return { intercept, slope, stdErr };
}
