import { Network } from "./Network";
import { random } from "./Utilis";

interface GeneticConfig {
  population_size: number;
  generations: number;
  hidden_layers: Array<number>;
  inputs: Array<number>;
  outputs: Array<number>;
  activationMethod: string;
  tournamentSize: number;
  crossoverProbability: number;
  crossoverPoint: number;
  mutateProbability: number;
}
export class GeneticOptimalization {
  private population: Array<Network> = [];
  private population_size: number = 10;
  private generations: number = 20;
  private hidden_layers: Array<number> = [];
  private inputs: Array<number> = [1, 1];
  private outputs: Array<number> = [1, 0];
  private activationMethod: string = "sigmoid";
  private tournamentSize: number = 3;
  private crossoverProbability: number = 0.7;
  private crossoverPoint: number = 0.5;
  private mutateProbability: number = 0.07;
  constructor(config: GeneticConfig) {
    this.population_size = config.population_size;
    this.generations = config.generations;
    this.hidden_layers = config.hidden_layers;
    this.inputs = config.inputs;
    this.outputs = config.outputs;
    this.activationMethod = config.activationMethod;
    this.tournamentSize = config.tournamentSize;
    this.crossoverProbability = config.crossoverProbability;
    this.crossoverPoint = config.crossoverPoint;
    this.mutateProbability = config.mutateProbability;
  }

  initialize(): Array<Network> {
    console.log(
      "Starting configuration: \nPopulation size: " +
        this.population_size +
        "\nGenerations: " +
        this.generations +
        "\nHidden layers in each network: " +
        this.hidden_layers +
        "\nInputs in networks: " +
        this.inputs +
        "\nOutputs in network: " +
        this.outputs
    );
    var config = {
      hidden_layers: this.hidden_layers,
      inputs: this.inputs,
      outputs: this.outputs
    };
    for (var i = 0; i < this.population_size; i++) {
      this.population.push(new Network(config));
    }
    this.population.forEach(network => {
      network.create();
    });
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
        if (individual.error() < bestIndividual.error())
          bestIndividual = individual;
      });
      newPopulation.push(bestIndividual);
    }
    this.population = newPopulation;
    return newPopulation;
  }

  crossover(propability: number, point: number) {
    for (let j = 0; j < this.population.length; j += 2) {
      let size = this.population[j].getWeights().length;
      for (let i = Math.floor(size * point); i < size; i++) {
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
    for (let i = 0; i < this.generations; i++) {
      console.log("Generation: " + i + ". Score: " + this.grade());
      this.selection(this.tournamentSize);
      this.crossover(this.crossoverProbability, this.crossoverPoint);
      this.mutate(this.mutateProbability);
    }
  }
}
