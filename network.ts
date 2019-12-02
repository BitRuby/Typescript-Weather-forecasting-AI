export class Network {

    accuracy: Number;
    params: Object;
    network: Network;

    constructor(params = null) {
        this.accuracy = 0.0;
        this.params = params;
        this.network = {} as Network;
    }

    create() {
        for (let prop in this.params) {
            this.network[prop] = this.params[prop][Math.floor(Math.random() * this.params[prop].length)];
        }
    }

    set(network: Network) {
        this.network = network;
    }

    train(data) {
        // if (this.accuracy == 0.0) 
        //this.accuracy = train_and_score(this.network, data);
    }
}