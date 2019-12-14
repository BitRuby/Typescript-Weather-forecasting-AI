export const random = (min: number = 0, max: number = 1): number => {
  return Math.random() * (max - min) + min;
};

const random_seed = [0.321, 0.655, 0.23, 0.976, 0.003, 0.142, 0.769, 0.865];

export const randomSeed = (number: number) => {
  return Number(((number * random_seed[number % 7]) % 1).toPrecision(4));
};

export const normalize = (T: number, Tmin: number, Tmax: number) => {
  return Tmax === Tmin ? 1 : (T - Tmin) / (Tmax - Tmin);
};

export const renormalize = (Tn: number, Tmin: number, Tmax: number) => {
  return Tn * (Tmax - Tmin) + Tmin;
};

export const findExtremes = (data: Array<any>, column: string): Array<number> => {
  let min = parseInt(data[0][column]);
  let max = parseInt(data[0][column]);
  for (let i = 1; i < data.length; i++) {
    if (parseInt(data[i][column]) < min) min = parseInt(data[i][column]);
    if (parseInt(data[i][column]) > max) max = parseInt(data[i][column]);
  }
  return [min, max];
};

export const normalizeAll = (
  data: Array<any>,
  column: string,
  extremes: Array<number>
) => {
  for (let i = 0; i < data.length; i++) {
    data[i][column] = normalize(data[i][column], extremes[0], extremes[1]);
  }
};

export const sigmoid = (t: number) => {
  return 1 / (1 + Math.pow(Math.E, -t));
};
