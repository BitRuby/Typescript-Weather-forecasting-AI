import { Optimizer } from "./optim";

const generate = (args) => {
    const optimizer: Optimizer = new Optimizer({ params: args.network_param });
    const networks = optimizer.create_population(args.population);
}

const main = () => {

    const generations = 10;
    const population = 20;
    const data = {};
    const network_param = {
        layers: [1, 2, 3, 4],
        neurons: [64, 128, 256],
        optimizer: ['rmsprop'],
        activation_function: ['sigmoid']
    }

    generate({ generations, population, network_param, data });

}

main();