import { GeneticOptimalization } from "./GeneticOptimalization";
import { Network } from "./Network";
import { random } from "./Utilis";

const main = () => {

    const config = {
        hidden_layers: [7,7,7], //Value represents number of neurons in each hidden layer
        inputs: [0.15,32.3,0.44,74,4.4,0.01,55], //Input values of network
        outputs: 4, //Number of outputs in network
    }
    //const go = new GeneticOptimalization(config.population)
    const net = new Network(config);
    net.initialize();
    console.log(net.calculate());
}

main();
