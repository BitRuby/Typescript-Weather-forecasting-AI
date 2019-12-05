export const random = (min: number = 0, max: number = 1): number => {
    return Number(((Math.random() * max) + min).toPrecision(4));
}

const random_seed = [0.321, 0.655, 0.230, 0.976, 0.003, 0.142, 0.769, 0.865];

export const randomSeed = (number: number) => {
    return Number(((number * random_seed[number%7]) % 1).toPrecision(4));
}