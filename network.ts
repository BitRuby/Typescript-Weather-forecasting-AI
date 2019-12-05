import { random, randomSeed } from "./Utilis";

export class Network {
    weights = new Array<number>();
    result = new Array<number>();
    inputs = new Array<number>();
    layers = new Array<number>();
    constructor(inputs: Array<number>, layers: Array<number>) {
        this.inputs = inputs;
        this.layers = layers;
    }

    initialize() {
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
            for (var j=0; j < this.layers[i]; j++) {
                for (var k=0; k < this.layers[i-1]; k++) {
                    if (i === 1) this.result[k] = this.inputs[k];
                    outputs[j] += this.weights[z++] * this.result[k];
                }
            }
            this.result = [...outputs];
        }
        return this.result;
    }

}
