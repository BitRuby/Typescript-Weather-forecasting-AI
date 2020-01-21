import { GeneticOptimalization } from "./GeneticOptimalization";
import { random } from "./Utilis";

const main = async () => {
    const config = {
        size: 100, //Size of population
        nInputs: 11, //Network inputs
        hiddenLayers: [11], //Network hidden layers
        nOutputs: 3, //Network outputs
        nGenerations: 250, //Generation limit
        stopCriterium: 0.06, //Minimum error tolerance
        selectedIndividuals: 10, //Number of individuals participate in each tournament 
        crossoverPoint: random(0,1), //Crossover point
        crossoverProbability: 0.65, //Crossover probability of two individuals
        mutateProbability: 0.1 //Mutate probability in single individual
    }
    const go = new GeneticOptimalization(config);
    go.evolve();
    //go.test();
}
main();
