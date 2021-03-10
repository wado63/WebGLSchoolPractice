import { mat4, vec3 } from "gl-matrix";

/**
 * 3次元ベクトルの作成
 */
export const vec3FromValues = (x: number, y: number, z: number): vec3 =>
  vec3.fromValues(x, y, z);

/**
 * 3次元単位ベクトルの作成
 */
export const mat4Identity = (): mat4 => {
  const matrix = mat4.create();
  mat4.identity(matrix);
  return matrix;
};

/**
 * 回転させる行列を作成
 */
export const mat4FromRotation = (rad: number, axis: vec3): mat4 => {
  const matrix = mat4.create();
  mat4.fromRotation(matrix, rad, axis);
  return matrix;
};

/**
 * Y軸で回転させる行列を作成
 */
export const mat4FromYRotation = (radian: number): mat4 => {
  const matrix = mat4.create();
  mat4.fromYRotation(matrix, radian);
  return matrix;
};

type Mat4LookAtProps = { eye: vec3; center: vec3; up: vec3 };
/**
 * カメラ行列の作成
 */
export const mat4LookAt = ({ eye, center, up }: Mat4LookAtProps): mat4 => {
  const matrix = mat4.create();
  mat4.lookAt(matrix, eye, center, up);
  return matrix;
};

type Mat4PerspectiveProps = {
  fovy: number;
  aspect: number;
  near: number;
  far: number;
};
/**
 * プロジェクション行列の作成
 */
export const mat4Perspective = ({
  fovy,
  aspect,
  near,
  far,
}: Mat4PerspectiveProps): mat4 => {
  const matrix = mat4.create();
  mat4.perspective(matrix, fovy, aspect, near, far);
  return matrix;
};

/**
 * 行列の乗算
 * vp を作りたい場合は p x vと前から後ろに向かって乗算させる
 */
export const mat4Multiply = (matrixA: mat4, matrixB: mat4): mat4 => {
  const matrix = mat4Identity();
  mat4.multiply(matrix, matrixA, matrixB);
  return matrix;
};

/**
 * 平行移動させる行列を作成
 */
export const mat4FromTranslation = (vector: vec3): mat4 => {
  const matrix = mat4.create();
  mat4.fromTranslation(matrix, vector);
  return matrix;
};
