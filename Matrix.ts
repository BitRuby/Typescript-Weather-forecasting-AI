import { size } from "mathjs";
import { randomInt, random } from "./Utilis";

export class Matrix {
  static toVector(e: any): any {
    return [].concat(...e);
  }

  static toMatrix(e: any, s: any): any {
    let copy = [...e];
    let newArray = [];
    let size = 0,
      z = 0;
    while (copy.length > 0) {
      size = s[z++].length;
      newArray.push(copy.splice(0, size));
    }
    return newArray;
  }

  static onePointSwap(p: number, m1: Array<any>, m2: Array<any>) {

    let i1_2d = Matrix.toVector(m1);
    let i2_2d = Matrix.toVector(m2);
    let i1_1d = Matrix.toVector(i1_2d);
    let i2_1d = Matrix.toVector(i2_2d);
    let temp;
    for (
      let i = Math.floor(p * i1_1d.length);
      i < Math.min(i1_1d.length, i2_1d.length);
      i++
    ) {
      temp = i1_1d[i];
      i1_1d[i] = i2_1d[i];
      i2_1d[i] = temp;
    }
    let i1r_2d = Matrix.toMatrix(i1_1d, i1_2d);
    let i2r_2d = Matrix.toMatrix(i2_1d, i2_2d);
    return [Matrix.toMatrix(i1r_2d, m1), Matrix.toMatrix(i2r_2d, m2)];
  }

  static oneIndexSwap(m: Array<any>) {
    let v_2d = Matrix.toVector(m);
    let v_1d = Matrix.toVector(v_2d);
    v_1d[randomInt(0, v_1d.length-1)] = (random() <= 0.5) ? v_1d[0] : v_1d[v_1d.length - 1];
    let vr_2d = Matrix.toMatrix(v_1d, v_2d);
    return Matrix.toMatrix(vr_2d, m);
  }
}
