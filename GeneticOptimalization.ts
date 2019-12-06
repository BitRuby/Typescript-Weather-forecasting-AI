import { Network } from "./Network";

interface GeneticConfig {
    population_size: number;
    generations: number;
    hidden_layers: Array<number>;
    inputs: Array<number>;
    outputs: Array<number>;
}

export class GeneticOptimalization {
    private population: Array<Network> = [];
    private population_size: number = 10;
    private generations: number = 20;
    private hidden_layers: Array<number> = [];
    private inputs: Array<number> = [1, 1];
    private outputs: Array<number> = [1, 0];
    constructor(config: GeneticConfig) {
        this.population_size = config.population_size;
        this.generations = config.generations;
        this.hidden_layers = config.hidden_layers;
        this.inputs = config.inputs;
        this.outputs = config.outputs;
    }

    initialize(): Array<Network> {
        console.log("Starting configuration: \nPopulation size: " +
            this.population_size + "\nGenerations: " +
            this.generations + "\nHidden layers in each network: " +
            this.hidden_layers + "\nInputs in networks: " + this.inputs +
            "\nOutputs in network: " + this.outputs);
        var config = {
            hidden_layers: this.hidden_layers,
            inputs: this.inputs,
            outputs: this.outputs
        }
        for (var i = 0; i < this.population_size; i++) {
            this.population.push(new Network(config));


        }
        this.population.forEach(network => {
            network.create();
        })
        return this.population;
    }

    grade(network: Network): number {
        return network.error();
    }

    selection() {
        this.population.forEach((network, index) => {
            network.calculate();
            console.log("Network " + index + " grade: " + this.grade(network) + "\n");
        })
    }

    crossover() {

    }

    mutate() {

    }

    startEvolving() {
        if (this.population.length <= 0) throw new Error("Cannot find any population");
        this.selection();
    }



}