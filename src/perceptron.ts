const hash = require('object-hash');
const { exp, dot } = require('mathjs');

export function sigmoid (x: number) {
  return 1/(1 + exp(-x))
}

export default class Perceptron {

  id: string;
  size: number

  constructor(public weights: number[], public bias: number, public location?: {index: number, layer: number}) {
    this.id = hash({ weights, bias, ...location });
    this.size = weights.length;
  }

  process(vector: number[]): number {
    if (this.weights.length != vector.length) {
      throw "Perceptron Error: Input must be same shape as weights";
    }
    let dotProduct = dot(vector, this.weights);
    return sigmoid(dotProduct + this.bias);
  }
}
