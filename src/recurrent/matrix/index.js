import zeros from '../../utilities/zeros';

/**
 * A matrix
 * @param {Number} [rows]
 * @param {Number} [columns]
 * @constructor
 */
export default class Matrix {
  constructor(rows, columns) {
    if (typeof rows === 'undefined') return;
    if (typeof columns === 'undefined') return;

    this.rows = rows;
    this.columns = columns;
    this.weights = zeros(rows * columns);
    this.recurrence = zeros(rows * columns);
  }

  /**
   *
   * @param {Number} row
   * @param {Number} col
   * @returns {Float64Array|Array}
   */
  getWeights(row, col) {
    // slow but careful accessor function
    // we want row-major order
    let ix = (this.columns * row) + col;
    if (ix < 0 && ix >= this.weights.length) throw new Error('get accessor is skewed');
    return this.weights[ix];
  }

  /**
   *
   * @param {Number} row
   * @param {Number} col
   * @param v
   * @returns {Matrix}
   */
  setWeights(row, col, v) {
    // slow but careful accessor function
    let ix = (this.columns * row) + col;
    if (ix < 0 && ix >= this.weights.length) throw new Error('set accessor is skewed');
    this.weights[ix] = v;
    return this;
  }

  /**
   *
   * @returns {{rows: *, columns: *, weights: Array}}
   */
  toJSON() {
    return {
      rows: this.rows,
      columns: this.columns,
      weights: this.weights.slice(0)
    };
  }

  static fromJSON(json) {
    let matrix = new Matrix(json.rows, json.columns);
    for (let i = 0, max = json.rows * json.columns; i < max; i++) {
      matrix.weights[i] = json.weights[i]; // copy over weights
    }
    return matrix;
  }
}