import { GeneticOptimalization } from "./GeneticOptimalization";

const main = () => {

    const config = {
        population_size: 20, //Size of population
        generations: 10, //Number of generations
        hidden_layers: [4], //Value represents number of neurons in each hidden layer
        inputs: [0.5, 0.25, 0.75, 1], //Input values of network
        outputs: 4, //Number of outputs in network
    }
    const go = new GeneticOptimalization(config);
    go.initialize();
}

main();
