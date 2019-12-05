import { GeneticOptimalization } from "./GeneticOptimalization";
import { Network } from "./Network";
import { random } from "./Utilis";

const main = () => {

    const config = {
        population: 10, //Starting population
        hidden_layers: 1, //Value represents number of neurons in each hidden layer
        inputs: 4, //Number of inputs in network
        outputs: 4, //Number of outputs in network
    }
    //const go = new GeneticOptimalization(config.population)
    const net = new Network([1,1], [2,2]);
    net.initialize();
    console.log(net.calculate());
}

main();