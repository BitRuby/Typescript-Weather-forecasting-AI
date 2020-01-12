import { Network } from "./Network";
import { MathType } from "mathjs";
import { randomUnique, random, randomInt, copy } from "./Utilis";
import { Matrix } from "./Matrix";
import { Data } from "./Data";
import { Stats } from "./Stats";
import { performance } from "perf_hooks";

interface Config {
  size: number;
  nInputs: number;
  hiddenLayers: Array<number>;
  nOutputs: number;
  nGenerations: number;
  stopCriterium: number;
  selectedIndividuals: number;
  crossoverPoint: number;
  crossoverProbability: number;
  mutateProbability: number;
}

export class GeneticOptimalization {
  population: Array<Network> = new Array<Network>();
  config: Config;

  constructor(c: Config) {
    for (let i = 0; i < c.size; i++)
      this.population.push(
        new Network([c.nInputs, ...c.hiddenLayers, c.nOutputs])
      );
    this.config = c;
  }

  synapses() {
    this.population.forEach(e => {
      console.log(e.getSynapses());
    });
  }

  errors() {
    this.population.forEach(e => {
      console.log(e.getError());
    });
  }

  length() {
    console.log(this.population.length);
  }

  train(input: MathType, target: MathType) {
    this.population.forEach(e => e.train(input, target));
  }

  reset() {
    this.population.forEach(e => e.clearError());
  }

  grade(): number {
    return (
      this.population
        .map(e => {
          return e.getError();
        })
        .reduce((a, b) => a + b, 0) / this.population.length
    );
  }

  best(): number {
    return Math.min(
      ...this.population.map(e => {
        return e.getError();
      })
    );
  }

  bestNetwork(): Network {
    let best = copy(this.population[0]);
    this.population.forEach(e => {
      if (e.getError() < best.getError()) {
        best = copy(e);
      }
    });
    return best;
  }

  selection(n: number) {
    let newPopulation = new Array<Network>();
    let select, best: Network;
    if (n > this.population.length)
      throw new Error(
        `Maximum selected individuals is: ${this.population.length}`
      );
    best = copy(this.population[0]);
    this.population.map(e => {
      if (e.getError() < best.getError()) best = copy(e);
    });
    while (newPopulation.length !== this.population.length) {
      select = randomUnique(n, 0, this.population.length - 1);
      best = copy(this.population[select[0]]);
      select.map(e => {
        if (this.population[e].getError() < best.getError())
          best = copy(this.population[e]);
      });
      newPopulation.push(best);
    }
    this.population = newPopulation;
  }

  crossover(p: number, propability: number) {
    let result;
    for (let i = 0; i < this.population.length; i += 2) {
      if (propability >= random()) {
        result = Matrix.onePointSwap(
          p,
          this.population[
            randomInt(0, this.population.length - 1)
          ].getSynapses(),
          this.population[
            randomInt(0, this.population.length - 1)
          ].getSynapses()
        );
        this.population[i].setSynapses(result[0]);
        this.population[(i + 1) % this.population.length].setSynapses(
          result[1]
        );
      }
    }
  }

  mutate(propability: number) {
    let result;
    for (let i = 0; i < this.population.length; i++) {
      if (propability >= random()) {
        result = Matrix.oneIndexSwap(this.population[i].getSynapses());
        this.population[i].setSynapses(result);
      }
    }
  }

  evolve = async () => {
    const data = new Data();
    const stats = new Stats();
    let t0: number, t1: number;
    await data.load("data/encoded/train.csv");
    let inputs = data.separate(data.getData(), 0, 11);
    let targets = data.separate(data.getData(), 4, 6);
    for (let g = 0; g < this.config.nGenerations; g++) {
      t0 = performance.now();
      for (let i = 0; i < inputs.length - 1; i++) {
        this.train(inputs[i], targets[i + 1]);
      }
      console.log("Generation: " + g);
      this.selection(this.config.selectedIndividuals);
      this.crossover(
        this.config.crossoverPoint,
        this.config.crossoverProbability
      );
      this.mutate(this.config.mutateProbability);
      t1 = performance.now();
      stats.pushScore(this.best() / inputs.length);
      stats.pushTime(t1 - t0);
      console.log(
        "Population score (less=better): " + this.best() / inputs.length
      );
      if (this.best() / inputs.length <= this.config.stopCriterium) {
        data.saveToJson("data/trained_network.json", this.bestNetwork());
        stats.save("data/stats.csv");
        break;
      }
      this.reset();
    }
  };

  test = async () => {
    const data = new Data();
    const stats = new Stats();
    const network = new Network();
    let t0: number, t1: number;
    await data.load("data/encoded/test.csv");
    await data.readJson("data/trained_network.json");
    let networkConfig = data.getJson();
    network.setLayers(networkConfig.layers);
    network.setSynapses(networkConfig.synapses);
    let inputs = data.separate(data.getData(), 0, 11);
    let targets = data.separate(data.getData(), 4, 6);
    t0 = performance.now();
    for (let i = 0; i < data.getData().length - 1; i++) {
      network.train(inputs[i], targets[i + 1]);
      stats.pushScore(network.getError() / inputs.length);
      network.clearError();
    }
    t1 = performance.now(); 
    stats.pushTime(t1 - t0);
    stats.save("data/test_stats.csv");
  };
}
