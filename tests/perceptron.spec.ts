import Perceptron from '../src/perceptron'

describe('Perceptrons', () => {

  it('creates an id and records size on instantiation', () => {
    let mockPerceptron: Perceptron = new Perceptron([1, 1], -7);
    expect(mockPerceptron.id).toBeDefined();
    expect(mockPerceptron.size).toBe(2);
  });

  it('will have different ids for different locations', () => {
    let mockPerceptrons: Perceptron[] = [
      new Perceptron([2, 2], -4, {index: 0, layer: 1}),
      new Perceptron([2, 2], -4, {index: 1, layer: 1}),
      new Perceptron([2, 2], -4, {index: 0, layer: 2})
    ]

    mockPerceptrons.forEach((Perceptron, index) => {
      let next_index = index + 1;
      if (next_index === mockPerceptrons.length) {
        next_index = 0
      }
      expect(Perceptron.id).not.toBe(mockPerceptrons[next_index].id);
    });
  });

  it('throws an error when the input vector and weights aren\'t the same size', () => {
    let mockPerceptron = new Perceptron([1, 2, 3], -6);
    let expectedError: string;
    try {
      mockPerceptron.process([1, 1]);
    } catch (error) {
      expectedError = error;
    }
    expect(expectedError).toBeDefined();
  });

  describe('Vector Processing', () => {
    it('acts like an and-gate when weights are [2, 2] and the bias is -3', () => {
      let mockAndGate = new Perceptron([2, 2], -3);

      expect(mockAndGate.process([0, 0])).toBeLessThan(0.5);
      expect(mockAndGate.process([0, 1])).toBeLessThan(0.5);
      expect(mockAndGate.process([1, 1])).toBeGreaterThanOrEqual(0.5);
    });

    it('acts like an or-gate when weights are [2, 2] and the bias is -1', () => {
      let mockAndGate = new Perceptron([2, 2], -1);

      expect(mockAndGate.process([0, 0])).toBeLessThan(0.5);
      expect(mockAndGate.process([0, 1])).toBeGreaterThanOrEqual(0.5);
      expect(mockAndGate.process([1, 1])).toBeGreaterThanOrEqual(0.5);
    });
  });
});