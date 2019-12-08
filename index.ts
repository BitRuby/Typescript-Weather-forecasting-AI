import { GeneticOptimalization } from "./GeneticOptimalization";

const main = () => {

    const config = {
        population_size: 40, //Size of population
        generations: 50, //Number of generations
        hidden_layers: [1,2], //Value represents number of neurons in each hidden layer
        inputs: [0.5, 0.25, 0.75, 1], //Input values of network
        outputs: [1, 1, 1, 1], //Expected outputs in network
        activationMethod: 'sigmoid', //Function of activation name
        tournamentSize: 4, //Number of individuals participate in each tournament 
        crossoverProbability: 0.8, //Crossover probability of two individuals
        crossoverPoint: 0.5, //Point of chromosome to exchange genomes with two individuals
        mutateProbability: 0.01, //Mutate probability in single individual
    }
    const go = new GeneticOptimalization(config);
    go.initialize();
    go.startEvolving();
}
main();
