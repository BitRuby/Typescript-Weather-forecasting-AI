import { Data } from "./Data";

export class Stats {
  train_log: Array<number> = new Array<number>();
  test_log: Array<number> = new Array<number>();
  verify_log: Array<number> = new Array<number>();
  train_time: Array<number> = new Array<number>();
  test_time: Array<number> = new Array<number>();
  verify_time: Array<number> = new Array<number>();
  saveTrain(path: string) {
    let data = new Data();
    data.save(path, { error: this.train_log, time: this.train_time });
  }
  saveTest(path: string) {
    let data = new Data();
    data.save(path, { error: this.test_log, time: this.test_time });
  }
  saveVerify(path: string) {
    let data = new Data();
    data.save(path, { error: this.verify_log, time: this.verify_time });
  }

  pushTrainError(e: number) {
    this.train_log.push(e);
  }
  pushTestError(e: number) {
    this.test_log.push(e);
  }
  pushVerifyError(e: number) {
    this.verify_log.push(e);
  }
  pushTrainTime(e: number) {
    this.train_time.push(e);
  }
  pushTestTime(e: number) {
    this.test_time.push(e);
  }
  pushVerifyTime(e: number) {
    this.verify_time.push(e);
  }
  getLastError(): number {
      return this.verify_log[this.verify_log.length-1];
  }

}
