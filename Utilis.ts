export const random = (min: number = 0, max: number = 1): number => {
    return Number(((Math.random() * max) + min).toPrecision(4));
}

const random_seed = [0.321, 0.655, 0.230, 0.976, 0.003, 0.142, 0.769, 0.865];

export const randomSeed = (number: number) => {
    return Number(((number * random_seed[number % 7]) % 1).toPrecision(4));
}

export const normalize = (T: number, Tmin: number, Tmax: number) => {
    return (T - Tmin) / (Tmax - Tmin);
}

export const renormalize = (Tn: number, Tmin: number, Tmax: number) => {
    return Tn * (Tmax - Tmin) + Tmin
}

export const sigmoid = (t: number) => {
    return 1 / (1 + Math.pow(Math.E, -t));
}