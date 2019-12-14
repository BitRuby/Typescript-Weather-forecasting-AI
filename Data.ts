import { findExtremes, normalizeAll } from "./Utilis";
const csv = require("csvtojson");
const json = require("json2csv").parse;
const fs = require("fs");

export class Data {
  data: Array<Object> = [];
  constructor() {}

  load = async (path: string) => {
    try {
      this.data = await csv().fromFile(path);
    } catch (error) {
      throw new Error(error);
    }
  };

  encode = () => {
    if (this.data.length <= 0) {
      throw new Error("Could not find any data");
    }
    var keys = Object.keys(this.data[0]);
    for (let i = 1; i < keys.length; i++) {
      const extremes = findExtremes(this.data, keys[i]);
      normalizeAll(this.data, keys[i], extremes);
    }
  };

  save = async (path: string) => {
    try {
      var csv = json(this.data, { fields: Object.keys(this.data[0]) });
      fs.writeFile(path, csv, function(err: string) {
        console.log(err);
      });
    } catch (error) {
      throw new Error(error);
    }
  };
}
