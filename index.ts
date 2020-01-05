import { GeneticOptimalization } from "./GeneticOptimalization";
import { Data } from "./Data";
import { GeneticOptimalizationNew } from "./GeneticOptimalizationNew";
import { random } from "./Utilis";

const main = async () => {
    const config = {
        size: 100, //Size of population
        nInputs: 4, //Network inputs
        hiddenLayers: [14], //Network hidden layers
        nOutputs: 7, //Network outputs
        nGenerations: 5, //Generation limit
        selectedIndividuals: 8, //Number of individuals participate in each tournament 
        crossoverPoint: random(0,1), //Crossover point
        crossoverProbability: 0.75, //Crossover probability of two individuals
        mutateProbability: 0.05 //Mutate probability in single individual
    }
    const go = new GeneticOptimalizationNew(config);
    go.evolve();
}
main();
