import { GeneticOptimalization } from "./GeneticOptimalization";
import { Data } from "./Data";

const main = async () => {

    const config = {
        population_size: 1500, //Size of population
        generations: 100, //Number of generations
        hidden_layers: [4,4], //Value represents number of neurons in each hidden layer
        inputs: [1,1,1,1], //Input values of network
        outputs: [0,0,0,0], //Expected outputs in network
        activationMethod: 'sigmoid', //Function of activation name
        tournamentSize: 5, //Number of individuals participate in each tournament 
        crossoverProbability: 0.5, //Crossover probability of two individuals
        crossoverPoint: 0.3, //Point of chromosome to exchange genomes with two individuals
        mutateProbability: 0.1, //Mutate probability in single individual,
        errorTolerance: 0.02 //Score stop criterium
    }
    const go = new GeneticOptimalization(config);
    const dt = new Data();
    await dt.load("data/data.csv");
    dt.encode();
    await dt.divide("0.6:0.2:0.2");
    go.initialize();
    go.startEvolving();
}
main();
