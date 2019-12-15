import { GeneticOptimalization } from "./GeneticOptimalization";
import { Data } from "./Data";
import { ObjectStrings } from "./ObjectStrings";

const main = async () => {
    const data = new Data();
    await data.load("data/encoded/train.csv");
    const config = {
        population_size: 250, //Size of population
        generations: 100, //Number of generations
        hidden_layers: [6,6], //Value represents number of neurons in each hidden layer
        data: data.getData(), //Load json dataset 
        activation_method: 'sigmoid', //Function of activation name
        tournament_size: 15, //Number of individuals participate in each tournament 
        crossover_probability: 0.5, //Crossover probability of two individuals
        mutate_probability: 0.1, //Mutate probability in single individual,
        error_tolerance: 0.05, //Score stop criterium
        weights_range: [-5,5] //Random weights range
    }
    const go = new GeneticOptimalization(config);
    go.initialize();
    go.startEvolving();
}
main();
