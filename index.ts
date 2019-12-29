import { GeneticOptimalization } from "./GeneticOptimalization";
import { Data } from "./Data";

const main = async () => {
    const data = new Data();
    await data.load("data/encoded/train.csv");
    const config = {
        population_size: 50, //Size of population
        generations: 100, //Number of generations
        hidden_layers: [4,4,4], //Value represents number of neurons in each hidden layer
        data: data.getData(), //Load json dataset 
        activation_method: 'sigmoid', //Function of activation name
        tournament_size: 11, //Number of individuals participate in each tournament 
        crossover_probability: 0.6, //Crossover probability of two individuals
        mutate_probability: 0.05, //Mutate probability in single individual,
        error_tolerance: 0.05, //Score stop criterium
        weights_range: [-15,15], //Random weights range
        separate: 4 //Separate data columns into two piles, value represents column index, 0 = no separation
    }
    const go = new GeneticOptimalization(config);
    go.initialize();
    go.startEvolving();
}
main();
