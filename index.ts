import { GeneticOptimalization } from "./GeneticOptimalization";
import { random } from "./Utilis";

const main = async () => {
    const config = {
        size: 100, //Size of population
        nInputs: 11, //Network inputs
        hiddenLayers: [6], //Network hidden layers
        nOutputs: 1, //Network outputs
        nGenerations: 250, //Generation limit
        stopCriterium: 0.03, //Minimum error tolerance
        selectedIndividuals: 10, //Number of individuals participate in each tournament 
        crossoverPoint: random(0,1), //Crossover point
        crossoverProbability: 0.65, //Crossover probability of two individuals
        mutateProbability: 0.11 //Mutate probability in single individual
    }
    const go = new GeneticOptimalization(config);
    go.evolve();
}
main();
