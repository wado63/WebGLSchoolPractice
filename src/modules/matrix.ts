/**
 * 行列計算計算用のutils
 * ※ 自作は効率が悪いのでgl-matrixに移行する
 */

type Vec2 = [number, number];
type Vec3 = [number, number, number];
type Vec4 = [number, number, number, number];
type Mat4 = [
  [number, number, number, number],
  [number, number, number, number],
  [number, number, number, number],
  [number, number, number, number]
];

type LookAtProps = {
  cameraPosition: Vec3;
  tragetPosition: Vec3;
  normal: Vec3;
};

const vec3cross = ([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): Vec3 => [
  y1 * z2 - z1 * y2,
  z1 * x2 - x1 * z2,
  x1 * y2 - y1 * x2,
];

/**
 * ビュー座標変換行列を生成する（参照に注意・戻り値としても結果を返す）
 * @param {Vec3} cameraPosition - 視点位置
 * @param {Vec3} center - 注視点
 * @param {Vec3} up - 上方向を示すベクトル
 * @param {Mat4} [dest] - 結果を格納する行列
 * @return {Mat4} 結果の行列
 */

export const lookAt = ({
  cameraPosition,
  tragetPosition,
  normal,
}: LookAtProps): Mat4 => {
  // if (eyeX == centerX && eyeY == centerY && eyeZ == centerZ) {
  //   return Mat4.identity(dest);
  // }
  // let out = dest;
  // if (dest == null) {
  //   out = Mat4.create();
  // }

  // カメラの向いている反対方向をZ軸とする
  const zAxis: Vec3 = [
    cameraPosition[0] - tragetPosition[0],
    cameraPosition[1] - tragetPosition[1],
    cameraPosition[2] - tragetPosition[2],
  ];

  const zLength = zAxis.reduce((a, c) => a + c ** 2, 0) ** 0.5;

  const normalizeZ: Vec3 = [
    zAxis[0] / zLength,
    zAxis[1] / zLength,
    zAxis[2] / zLength,
  ];

  // カメラのZ軸と法線ベクトルからX軸を割り出す
  const xAxis: Vec3 = vec3cross(normal, normalizeZ);
  const xLength = xAxis.reduce((a, c) => a + c ** 2, 0) ** 0.5;
  const normalizeX: Vec3 = [
    xAxis[0] / xLength,
    xAxis[1] / xLength,
    xAxis[2] / xLength,
  ];

  // カメラのZ軸とX軸からY軸を割り出す
  const yAxis: Vec3 = vec3cross(normalizeZ, normalizeX);
  const yLength = xAxis.reduce((a, c) => a + c ** 2, 0) ** 0.5;
  const normalizeY: Vec3 = [
    yAxis[0] / yLength,
    yAxis[1] / yLength,
    yAxis[2] / yLength,
  ];

  return [
    [normalizeX[0], normalizeY[0], normalizeZ[0], 0],
    [normalizeX[1], normalizeY[1], normalizeZ[1], 0],
    [normalizeX[2], normalizeY[2], normalizeZ[2], 0],
    [
      -(
        normalizeX[0] * cameraPosition[0] +
        normalizeX[1] * cameraPosition[1] +
        normalizeX[2] * cameraPosition[2]
      ),
      -(
        normalizeY[0] * cameraPosition[0] +
        normalizeY[1] * cameraPosition[1] +
        normalizeY[2] * cameraPosition[2]
      ),
      -(
        normalizeZ[0] * cameraPosition[0] +
        normalizeZ[1] * cameraPosition[1] +
        normalizeZ[2] * cameraPosition[2]
      ),
      1,
    ],
  ];
};

type PerspectiveProps = {
  fov: number;
  aspect: number;
  near: number;
  far: number;
};

export const perspective = ({
  fov,
  aspect,
  near,
  far,
}: PerspectiveProps): Mat4 => {
  const t = near * Math.tan((fov * Math.PI) / 360);
  const r = t * aspect;
  const a = r * 2,
    b = t * 2,
    c = far - near;
  return [
    [(near * 2) / a, 0, 0, 0],
    [0, (near * 2) / b, 0, 0],
    [0, 0, -(far + near) / c, -1],
    [0, 0, -(far * near * 2) / c, 0],
  ];
};

export const multiply = (mat0: Mat4, mat1: Mat4): Mat4 => {
  const a = mat0[0][0],
    b = mat0[0][1],
    c = mat0[0][2],
    d = mat0[0][3],
    e = mat0[1][0],
    f = mat0[1][1],
    g = mat0[1][2],
    h = mat0[1][3],
    i = mat0[2][0],
    j = mat0[2][1],
    k = mat0[2][2],
    l = mat0[2][3],
    m = mat0[3][0],
    n = mat0[3][1],
    o = mat0[3][2],
    p = mat0[3][3],
    A = mat1[0][0],
    B = mat1[0][1],
    C = mat1[0][2],
    D = mat1[0][3],
    E = mat1[1][0],
    F = mat1[1][1],
    G = mat1[1][2],
    H = mat1[1][3],
    I = mat1[2][0],
    J = mat1[2][1],
    K = mat1[2][2],
    L = mat1[2][3],
    M = mat1[3][0],
    N = mat1[3][1],
    O = mat1[3][2],
    P = mat1[3][3];
  const out = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  out[0][0] = A * a + B * e + C * i + D * m;
  out[0][1] = A * b + B * f + C * j + D * n;
  out[0][2] = A * c + B * g + C * k + D * o;
  out[0][3] = A * d + B * h + C * l + D * p;
  out[1][0] = E * a + F * e + G * i + H * m;
  out[1][1] = E * b + F * f + G * j + H * n;
  out[1][2] = E * c + F * g + G * k + H * o;
  out[1][3] = E * d + F * h + G * l + H * p;
  out[2][0] = I * a + J * e + K * i + L * m;
  out[2][1] = I * b + J * f + K * j + L * n;
  out[2][2] = I * c + J * g + K * k + L * o;
  out[2][3] = I * d + J * h + K * l + L * p;
  out[3][0] = M * a + N * e + O * i + P * m;
  out[3][1] = M * b + N * f + O * j + P * n;
  out[3][2] = M * c + N * g + O * k + P * o;
  out[3][3] = M * d + N * h + O * l + P * p;
  return out as Mat4;
};

/**
 * 行列に回転を適用する（参照に注意・戻り値としても結果を返す）
 * @param {Mat4} mat - 適用を受ける行列
 * @param {number} angle - 回転量を表す値（ラジアン）
 * @param {Vec3} axis - 回転の軸
 * @param {Mat4} [dest] - 結果を格納する行列
 * @return {Mat4} 結果の行列
 */
export const rotate = (mat: Mat4, angle: number, axis: Vec3): Mat4 => {
  let sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
  let a = axis[0],
    b = axis[1],
    c = axis[2];
  if (sq != 1) {
    sq = 1 / sq;
    a *= sq;
    b *= sq;
    c *= sq;
  }
  const d = Math.sin(angle),
    e = Math.cos(angle),
    f = 1 - e,
    g = mat[0][0],
    h = mat[0][1],
    i = mat[0][2],
    j = mat[0][3],
    k = mat[1][0],
    l = mat[1][1],
    m = mat[1][2],
    n = mat[1][3],
    o = mat[2][0],
    p = mat[2][1],
    q = mat[2][2],
    r = mat[2][3],
    s = a * a * f + e,
    t = b * a * f + c * d,
    u = c * a * f - b * d,
    v = a * b * f - c * d,
    w = b * b * f + e,
    x = c * b * f + a * d,
    y = a * c * f + b * d,
    z = b * c * f - a * d,
    A = c * c * f + e;

  let out: Mat4 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  if (angle) {
    if (mat != out) {
      out[3][0] = mat[3][0];
      out[3][1] = mat[3][1];
      out[3][2] = mat[3][2];
      out[3][3] = mat[3][3];
    }
  } else {
    out = mat;
  }
  out[0][0] = g * s + k * t + o * u;
  out[0][1] = h * s + l * t + p * u;
  out[0][2] = i * s + m * t + q * u;
  out[0][3] = j * s + n * t + r * u;
  out[1][0] = g * v + k * w + o * x;
  out[1][1] = h * v + l * w + p * x;
  out[1][2] = i * v + m * w + q * x;
  out[1][3] = j * v + n * w + r * x;
  out[2][0] = g * y + k * z + o * A;
  out[2][1] = h * y + l * z + p * A;
  out[2][2] = i * y + m * z + q * A;
  out[2][3] = j * y + n * z + r * A;
  return out;
};
