import { findExtremes, normalizeAll } from "./Utilis";
import { ObjectStrings } from "./ObjectStrings";
const csv = require("csvtojson");
const json = require("json2csv").parse;
const fs = require("fs");

export class Data {
  private data: Array<ObjectStrings> = [];
  private train: Array<ObjectStrings> = [];
  private test: Array<ObjectStrings> = [];
  private verify: Array<ObjectStrings> = [];
  constructor() {}

  load = async (path: string) => {
    try {
      this.data = await csv().fromFile(path);
    } catch (error) {
      throw new Error(error);
    }
  };

  getData = (): Array<ObjectStrings> => {
    if (this.data.length <= 0) {
      throw new Error("Could not find any data");
    }
    return this.data;
  };

  encode = () => {
    if (this.data.length <= 0) {
      throw new Error("Could not find any data");
    }
    var keys = Object.keys(this.data[0]);
    for (let i = 0; i < keys.length; i++) {
      const extremes = findExtremes(this.data, keys[i]);
      normalizeAll(this.data, keys[i], extremes);
    }
  };

  divide = async (ratio: string) => {
    var ratios = ratio.split(":");
    if (ratios.length !== 3) {
      throw new Error("Invalid data divide ratio");
    }
    if (this.data.length <= 0) {
      throw new Error("Could not find any data");
    }
    this.train[0] = this.data[0];
    this.test[0] = this.data[0];
    this.verify[0] = this.data[0];
    var length = this.data.length;
    for (var i = 1; i < Math.floor(length * Number(ratios[0])); i++) {
      this.train[i] = this.data[i];
    }
    var j = 0;
    for (
      var i = Math.floor(length * Number(ratios[0]));
      i < Math.floor(length * (Number(ratios[0]) + Number(ratios[1])));
      i++
    ) {
      this.test[j++] = this.data[i];
    }
    var k = 0;
    for (
      var i = Math.floor(length * (Number(ratios[0]) + Number(ratios[1])));
      i < length;
      i++
    ) {
      this.verify[k++] = this.data[i];
    }
    await this.save("data/encoded/train.csv", this.train);
    await this.save("data/encoded/test.csv", this.test);
    await this.save("data/encoded/verify.csv", this.verify);
  };

  save = async (path: string, data: Array<Object> = this.data) => {
    try {
      var csv = json(data, { fields: Object.keys(data[0]) });
      fs.writeFile(path, csv, () => {});
    } catch (error) {
      throw new Error(error);
    }
  };
}
