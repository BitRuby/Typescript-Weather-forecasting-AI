import { GeneticOptimalization } from "./GeneticOptimalization";

const main = () => {

    const config = {
        population_size: 10, //Size of population
        generations: 20, //Number of generations
        hidden_layers: [], //Value represents number of neurons in each hidden layer
        inputs: [1, 1], //Input values of network
        outputs: [0,0], //Expected outputs in network
        activationMethod: 'sigmoid', //Function of activation name
        tournamentSize: 2, //Number of individuals participate in each tournament 
        crossoverProbability: 0.5, //Crossover probability of two individuals
        crossoverPoint: 0.4, //Point of chromosome to exchange genomes with two individuals
        mutateProbability: 0.08, //Mutate probability in single individual
    }
    const go = new GeneticOptimalization(config);
    go.initialize();
    go.startEvolving();
}
main();
