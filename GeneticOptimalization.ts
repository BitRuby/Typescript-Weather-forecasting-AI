import { Network } from "./Network";
import { random } from "./Utilis";
import { ObjectStrings } from "./ObjectStrings";
import { Data } from "./Data";
import { Stats } from "./Stats";

interface GeneticConfig {
  population_size: number;
  generations: number;
  hidden_layers: Array<number>;
  data: Array<ObjectStrings>;
  activation_method: string;
  tournament_size: number;
  crossover_probability: number;
  mutate_probability: number;
  error_tolerance: number;
  weights_range: Array<number>;
  separate: number;
}
export class GeneticOptimalization {
  private population: Array<Network> = [];
  private population_size: number = 10;
  private generations: number = 20;
  private hidden_layers: Array<number> = [];
  private data: Array<ObjectStrings> = [];
  private activation_method: string = "sigmoid";
  private tournament_size: number = 3;
  private crossover_probability: number = 0.7;
  private mutate_probability: number = 0.07;
  private error_tolerance: number = 0.02;
  private weights_range: Array<number> = [-5, 5];
  private separate: number = 0;
  constructor(config: GeneticConfig) {
    this.population_size = config.population_size;
    this.generations = config.generations;
    this.hidden_layers = config.hidden_layers;
    this.data = config.data;
    this.activation_method = config.activation_method;
    this.tournament_size = config.tournament_size;
    this.crossover_probability = config.crossover_probability;
    this.mutate_probability = config.mutate_probability;
    this.error_tolerance = config.error_tolerance;
    this.weights_range = config.weights_range;
    this.separate = config.separate;
  }

  initialize(): Array<Network> {
    console.log(
      "Starting configuration: \nPopulation size: " +
        this.population_size +
        "\nGenerations: " +
        this.generations +
        "\nHidden layers in each network: " +
        this.hidden_layers.length +
        "\nNumber of inputs/outputs in networks: " +
        Object.keys(this.data[0]).length
    );
    var config = {
      hidden_layers: this.hidden_layers,
      weights_range: this.weights_range
    };
    for (var i = 0; i < this.population_size; i++) {
      this.population.push(new Network(config));
    }
    return this.population;
  }

  grade(): number {
    var sum = 0;
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calculate();
      sum += this.population[i].error();
    }
    return sum / this.population.length;
  }

  createAll() {
    this.population.forEach(network => {
      network.create();
    });
  }

  setAllInputs(inputs: ObjectStrings, separate: number) {
    this.population.forEach(p => {
      p.setInputs(inputs, separate);
    });
  }

  setAllOutputs(outputs: ObjectStrings, separate: number) {
    this.population.forEach(p => {
      p.setOutputs(outputs, separate);
    });
  }

  calculate() {
    this.population.forEach(p => {
      p.calculate();
    });
  }

  addError() {
    this.population.forEach(p => {
      p.addError(p.error());
    });
  }

  clearError() {
    this.population.forEach(p => {
      p.clearSumError();
    });
  }

  findMinError(): number {
    let minError = this.population[0].getSumError();
    for (var i = 1; i < this.population.length; i++) {
      if (minError > this.population[i].getSumError()) {
        minError = this.population[i].getSumError();
      }
    }
    return minError;
  }

  findBestNetwork(): Network {
    let minError = this.population[0].getSumError();
    let network = this.population[0];
    for (var i = 1; i < this.population.length; i++) {
      if (minError > this.population[i].getSumError()) {
        minError = this.population[i].getSumError();
        network = this.population[i];
      }
    }
    return network;
  }

  // best(): number {
  //   this.population[0].calculate();
  //   var minError = this.population[0].error();
  //   for (var i = 1; i < this.population.length; i++) {
  //     this.population[i].calculate();
  //     if (minError > this.population[i].error()) {
  //       minError = this.population[i].error();
  //     }
  //   }
  //   return minError;
  // }

  // bestNetwork(): Network {
  //   this.population[0].calculate();
  //   var minError = this.population[0].error();
  //   var network = this.population[0];
  //   for (var i = 1; i < this.population.length; i++) {
  //     this.population[i].calculate();
  //     if (minError > this.population[i].error()) {
  //       minError = this.population[i].error();
  //       network = this.population[i];
  //     }
  //   }
  //   return network;
  // }

  selection(n: number): Array<Network> {
    var newPopulation = new Array<Network>();
    var bestIndividual = {} as Network;
    var tournamentIndividuals = new Array<Network>();
    for (var i = 0; i < this.population.length; i++) {
      tournamentIndividuals = new Array<Network>();
      while (tournamentIndividuals.length <= n) {
        tournamentIndividuals.push(
          this.population[Math.floor(Math.random() * this.population.length)]
        );
      }
      bestIndividual = tournamentIndividuals.values().next().value;
      tournamentIndividuals.forEach(individual => {
        if (individual.getSumError() < bestIndividual.getSumError())
          bestIndividual = individual;
      });
      newPopulation.push(bestIndividual);
    }
    this.population = newPopulation;
    return newPopulation;
  }

  crossover(propability: number) {
    for (let j = 0; j < this.population.length; j += 2) {
      let size = this.population[j].getWeights().length;
      for (let i = Math.floor(size * random(0, 1)); i < size; i++) {
        if (propability >= random()) {
          let temp = this.population[j].getWeight(i);
          this.population[j].setWeight(
            i,
            this.population[(j + 1) % this.population.length].getWeight(i)
          );
          this.population[(j + 1) % this.population.length].setWeight(i, temp);
        }
      }
    }
  }

  mutate(propability: number) {
    let a: number, b: number, randomGene: number, newChromosome: Array<number>;
    for (var i = 0; i < this.population.length; i++) {
      if (propability >= random()) {
        a = this.population[i].getWeights()[0];
        b = this.population[i].getWeights()[
          this.population[i].getWeights().length - 1
        ];
        randomGene = Math.floor(
          random() * this.population[i].getWeights().length
        );
        newChromosome = this.population[i].getWeights();
        if (0.5 >= random()) {
          newChromosome[randomGene] = a;
        } else {
          newChromosome[randomGene] = b;
        }
        this.population[i].setWeights(newChromosome);
      }
    }
  }

  startEvolving() {
    const data = new Data();
    const stats = new Stats();
    let stopCriterium: boolean = true;
    for (let i = 0; i < this.generations && stopCriterium; i++) {
      for (let j = 0; j < this.data.length - 1; j++) {
        this.setAllInputs(this.data[j], this.separate);
        this.setAllOutputs(this.data[j + 1], this.separate);
        if (i === 0) this.createAll();
        this.calculate();
        this.addError();
      }
      stats.prompt(i, this.findMinError());
      this.clearError();
      this.selection(this.tournament_size);
      this.crossover(this.crossover_probability);
      this.mutate(this.mutate_probability);
    }
  }

  // startEvolving() {
  //   const data = new Data();
  //   let stopCriterium: boolean = true;
  //   let bestPopulation = {};
  //   for (let j = 0; j < this.data.length - 1 && stopCriterium; j++) {
  //     console.log("Dataset: " + j);
  //     this.setAllInputs(this.data[j], this.separate);
  //     this.setAllOutputs(this.data[j+1], this.separate);
  //     this.createAll();
  //     for (let i = 0; i < this.generations; i++) {
  //       console.log("Generation: " + i + ". Score: " + this.best());
  //       if (this.best() < this.error_tolerance) {
  //         bestPopulation = this.population;
  //         data.save("data/trained_network.csv", this.bestNetwork());
  //         stopCriterium = false;
  //         break;
  //       }
  //       this.selection(this.tournament_size);
  //       this.crossover(this.crossover_probability);
  //       this.mutate(this.mutate_probability);
  //     }
  //   }
  // }
}
