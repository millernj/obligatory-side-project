const hash = require('object-hash');
const { exp, dot } = require('mathjs');

export function sigmoid (x: number) {
  return 1/(1 + exp(-x));
}

export default class Perceptron {

  private _id: string;
  private _size: number;

  constructor(private _weights: number[], public bias: number, public location?: {index: number, layer: number}) {
    this._id = hash({ _weights, bias, ...location });
    this._size = _weights.length;
  }

  get weights(): number[] {
    return this._weights;
  }

  get id(): string {
    return this._id;
  }

  get size(): number {
    return this._size;
  }

  set weights(newWeights: number[]) {
    this._weights = newWeights;
    this._size = this._weights.length;
  }

  process(vector: number[]): number {
    if (this._weights.length != vector.length) {
      throw "Perceptron Error: Input vector must be same shape as weights";
    }
    let dotProduct = dot(vector, this._weights);
    return sigmoid(dotProduct + this.bias);
  }
}
