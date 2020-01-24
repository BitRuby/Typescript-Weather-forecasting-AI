import { GeneticOptimalization } from "./GeneticOptimalization";
import { random } from "./Utilis";

const main = async () => {
    const config = {
        size: 100, //Size of population
        nInputs: 11, //Network inputs
        hiddenLayers: [11], //Network hidden layers
        nOutputs: 1, //Network outputs
        nGenerations: 250, //Generation limit
        stopCriterium: 0.05, //Minimum error tolerance
        selectedIndividuals: 9, //Number of individuals participate in each tournament 
        crossoverPoint: random(0,1), //Crossover point
        crossoverProbability: 0.7, //Crossover probability of two individuals
        mutateProbability: 0.15 //Mutate probability in single individual
    }
    const go = new GeneticOptimalization(config);
    go.evolve();
    //go.test();
}
main();
