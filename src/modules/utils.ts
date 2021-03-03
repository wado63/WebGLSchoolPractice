/**
 * @file
 * 行列計算などのユーティリティ関数
 */

/**
 * scalarの計算
 */
export const getScalar: (...params: number[]) => number = (...params) =>
  params.reduce((a, c) => a + c ** 2, 0) ** 0.5;

/**
 * ベクトルを単位ベクトルに変換
 */
export const getUnitVector: (...params: number[]) => number[] = (...params) => {
  const scalar = getScalar(...params);
  return params.map((params) => params / scalar);
};

/**
 * XY で構成されたベクトル２つを受け取り内積の結果を返す
 * @param x1 １つ目のベクトルの X 要素
 * @param y1 １つ目のベクトルの Y 要素
 * @param x2 ２つ目のベクトルの X 要素
 * @param y2 ２つ目のベクトルの Y 要素
 */
export const getVector2Dot = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => x1 * x2 + y1 * y2;

/**
 * XY で構成されたベクトル２つを受け取り外積の結果を返す
 * @param x1 １つ目のベクトルの X 要素
 * @param y1 １つ目のベクトルの Y 要素
 * @param x2 ２つ目のベクトルの X 要素
 * @param y2 ２つ目のベクトルの Y 要素
 */
export const getVector2Cross = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => x1 * y2 - y1 * x2;
