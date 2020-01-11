import { Data } from "./Data";

export class Stats {

    log: Array<number> = new Array<number>();

    save() {
        let data = new Data();
        data.save("data/stats.csv", {error: this.log});
    }

    push(e: number) {
        this.log.push(e);
    }

}