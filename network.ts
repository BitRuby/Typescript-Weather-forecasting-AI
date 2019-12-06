import { random, randomSeed } from "./Utilis";

interface NetworkConfig {
    hidden_layers: Array<number>;
    inputs: Array<number>;
    outputs: number;
}

export class Network {
    private weights: Array<number> = [];
    private result: Array<number> = [];
    private inputs: Array<number> = [];
    private layers: Array<number> = [];
    constructor(config: NetworkConfig) {
        this.inputs = config.inputs;
        this.layers.push(config.inputs.length);
        this.layers = [...this.layers, ...config.hidden_layers];
        this.layers.push(config.outputs);
    }

    getWeights(): Array<number> {
        return this.weights;
    }

    setWeights(weights: Array<number>) {
        this.weights = weights;
    }

    getResult(): Array<number> {
        return this.result;
    }

    create() {
        if (this.weights.length > 0) {
            throw new Error("Network already created");
        }
        var z = 0;
        for (var i = 0; i < this.layers.length; i++) {
            for (var j = 0; j < this.layers[i + 1]; j++) {
                for (var k = 0; k < this.layers[i]; k++) {
                    this.weights.push(randomSeed(++z));
                }
            }
        }
    }

    calculate() {
        var z = 0;
        for (var i = 1; i < this.layers.length; i++) {
            var outputs = new Array<number>(this.layers[i]).fill(0);
            for (var j = 0; j < this.layers[i]; j++) {
                for (var k = 0; k < this.layers[i - 1]; k++) {
                    if (i === 1) this.result[k] = this.inputs[k];
                    outputs[j] += this.weights[z++] * this.result[k];
                }
            }
            this.result = [...outputs];
        }
        return this.result;
    }

}
