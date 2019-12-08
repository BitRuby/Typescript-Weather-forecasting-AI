import { GeneticOptimalization } from "./GeneticOptimalization";

const main = () => {

    const config = {
        population_size: 50, //Size of population
        generations: 10, //Number of generations
        hidden_layers: [4, 4], //Value represents number of neurons in each hidden layer
        inputs: [0.5, 0.25, 0.75, 1], //Input values of network
        outputs: [1, 1, 1, 1], //Expected outputs in network
        activationMethod: 'sigmoid', //Function of activation name
        tournamentSize: 3, //Number of individuals participate in each tournament 
        crossoverProbability: 0.7, //Crossover probability of two individuals
        crossoverPoint: 0.5, //Point of chromosome to exchange genomes with two individuals
        mutateProbability: 0.5, //Mutate probability in single individual
    }
    const go = new GeneticOptimalization(config);
    go.initialize();
    go.startEvolving();
}

main();
