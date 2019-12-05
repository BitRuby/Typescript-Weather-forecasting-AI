import { Network } from './network';

export class Optimizer {
    mutate_chance: number;
    random_select: number;
    retain: number;
    params: any;
    constructor(params: any, retain: number = 0.4, random_select: number = 0.1, mutate_chance: number = 0.2) {
        this.mutate_chance = mutate_chance;
        this.random_select = random_select;
        this.retain = retain;
        this.params = params;
    }
    create_population(population: any) {
        const pop = [];
        for (let i = 0; i < population; i++) {
            const network: Network = new Network(this.params);
            network.create();
            pop.push(network);
        }
        return pop;
    }

    fitness(network) {
        return network.accuracy;
    }

    grade(population): Number {
        let sum = 0;
        population.map(obj => {
            sum += this.fitness(obj);
        })
        return sum / population.length;
    }

    breed(mother, father): Array<Network> {
        let children = [];
        for (let i = 0; i < 2; i++) {
            let child = {} as Network;
            for (let param in this.params) {
                child[param] = [mother, father][Math.floor(Math.random() * 2)][param];
            }
            let network = new Network(this.params);
            network.set(child);
            if (this.mutate_chance > Math.random()) {
                network = this.mutate(network);
            }
            children.push(network);
        }
        return children;
    }

    mutate(network): Network {
        let keys = Object.keys(this.params); //layers, neurons, optimizer, activation_function
        const mutation = keys[Math.floor(Math.random() * keys.length)];
        network.network[mutation] = this.params[mutation][Math.floor(Math.random() * keys.length)]
        return network;
    }

    evolve(population) {
        let graded = [];
        for (let network in population) {
            graded.push(this.fitness(network));
        }
        graded.sort();
        const retain_length = parseInt((graded.length * this.retain).toString());
        let parents = graded[retain_length];

        for (let individual in graded[retain_length]) {
            if (this.random_select > Math.random()) {
                parents.push(individual);
            }
        }
        const parents_length = parents.length;
        const desired_length = population.length - parents_length;
        const children = [];
        while (children.length < desired_length) {
            let male = Math.floor(Math.random() * parents_length - 1);
            let female = Math.floor(Math.random() * parents_length - 1);
            if (male !== female) {
                male = parents[male];
                female = parents[female];
                const babies = this.breed(male, female);
                for (let baby in babies) {
                    if (children.length < desired_length)
                        children.push(baby);
                }
            }
        }
        parents = [...parents, children];
        return parents;
    }
}