import { GeneticOptimalization } from "./GeneticOptimalization";
import { Data } from "./Data";
import { GeneticOptimalizationNew } from "./GeneticOptimalizationNew";
import { random } from "./Utilis";

const main = async () => {
    const config = {
        size: 250, //Size of population
        nInputs: 11, //Network inputs
        hiddenLayers: [11,11], //Network hidden layers
        nOutputs: 1, //Network outputs
        nGenerations: 40, //Generation limit
        selectedIndividuals: 6, //Number of individuals participate in each tournament 
        crossoverPoint: random(0,1), //Crossover point
        crossoverProbability: 0.75, //Crossover probability of two individuals
        mutateProbability: 0.25 //Mutate probability in single individual
    }
    const go = new GeneticOptimalizationNew(config);
    go.evolve();
}
main();
