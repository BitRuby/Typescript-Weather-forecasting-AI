import { Data } from "./Data";

export class Stats {

    log: Array<number> = new Array<number>();
    time: Array<number> = new Array<number>();
    save(path: string) {
        let data = new Data();
        data.save(path, {error: this.log, time: this.time});
    }

    pushScore(e: number) {
        this.log.push(e);
    }
    pushTime(e: number) {
        this.time.push(e);
    }

}