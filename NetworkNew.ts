import { random, multiply, subtract, MathType } from "mathjs";
import { sigmoid } from "./Utilis";
const rand_range = [-15, 15];

export class NetworkNew {
  private synapses: Array<any> = new Array<any>();
  private layers: Array<any> = new Array<any>();
  private output: Array<any> = new Array<any>();
  private errorAcc: number = 0;

  constructor(layers: Array<number>) {
    for (let i = 0; i < layers.length - 1; i++) {
      this.synapses.push(
        random([layers[i], layers[i + 1]], rand_range[0], rand_range[1])
      );
    }
  }

  train(input: MathType, target: MathType) {
    this.layers[0] = input;
    for (let i = 1; i < this.synapses.length + 1; i++) {
      this.layers[i] = multiply(this.layers[i - 1], this.synapses[i - 1]);
      this.layers[i] = this.layers[i].map((e: number) => {
        return sigmoid(e);
      });
    }
    this.output = subtract(
      target,
      this.layers[this.layers.length - 1]
    ) as Array<any>;
    this.errorAcc += Math.abs(
      this.output.reduce((a, b) => a + b, 0) / this.output.length
    );
  }

  getError(): number {
    return this.errorAcc;
  }

  getSynapses(): Array<any> {
    return this.synapses;
  }

  setSynapses(synapses: Array<any>) {
    this.synapses = synapses;
  }

  clearError() {
    this.errorAcc = 0;
  }
}
