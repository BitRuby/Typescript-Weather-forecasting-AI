import { random, sigmoid } from "./Utilis";

interface NetworkConfig {
    hidden_layers: Array<number>;
    inputs: Array<number>;
    outputs: Array<number>;
}

export class Network {
    private weights: Array<number> = [];
    private inputs: Array<number> = [];
    private layers: Array<number> = [];
    private outputs: Array<number> = [];
    private matrix: Array<Array<number>> = [[]];
    constructor(config: NetworkConfig) {
        this.inputs = config.inputs;
        this.outputs = config.outputs;
        this.layers.push(config.inputs.length);
        this.layers = [...this.layers, ...config.hidden_layers];
        this.layers.push(config.outputs.length);
    }

    getWeights(): Array<number> {
        return this.weights;
    }

    getResult(): Array<number> {
        return this.matrix[this.matrix.length-1];
    }

    getWeight(index: number) {
        return this.getWeights()[index];
    }

    setWeight(index: number, value: number) {
        this.weights[index] = value;
    }

    setWeights(weights: Array<number>) {
        this.weights = [...weights];
    }

    error(): number {
        if (this.getResult().length <= 0) throw new Error("Result should be calculated first. Use grade function");
        if (this.getResult().length !== this.outputs.length) throw new Error("Result array should have same length as Output array");
        let errorValue = 0;
        for (var i = 0; i < this.getResult().length; i++) {
            errorValue += Math.abs(this.getResult()[i] - this.outputs[i]);
        }
        return errorValue / this.getResult().length;
    }

    create() {
        if (this.weights.length > 0) {
            throw new Error("Network already created");
        }
        this.gen2dArray();
        var z = 0;
        for (var i = 0; i < this.layers.length; i++) {
            for (var j = 0; j < this.layers[i + 1]; j++) {
                for (var k = 0; k < this.layers[i]; k++) {
                    this.weights.push(random(-5,5));
                }
            }
        }
    }

    gen2dArray () {
        var x = this.layers.length;
        var array = new Array(x);
        for(var i =0; i<array.length; i++) {
            if (i === 0) array[i] = [...this.inputs];
            else if (i === array.length-1) array[i] = [...this.outputs];
            else array[i] = new Array(this.layers[i]).fill(0)
        }
        this.matrix = array;
        return array;
    }

    calculate() {
        var z = 0;
        for (var x = 1; x < this.matrix.length; x++){
            for (var  y = 0; y < this.matrix[x].length; y++) {
                this.matrix[x][y] = 0;
                for (var a = 0; a < this.matrix[x-1].length; a++) {
                    this.matrix[x][y] += this.matrix[x-1][a] * this.weights[z++];
                }
                this.matrix[x][y] = sigmoid(this.matrix[x][y]);
            }
        }
    }

}
