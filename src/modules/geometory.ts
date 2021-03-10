/**
 * pure webGLで使用するgeometryを作成するutils
 */

type Vec2 = [number, number];
type Vec3 = [number, number, number];
type Vec4 = [number, number, number, number];

type Geometory = {
  /** 頂点座標 */
  position: Vec3[];
  /** 頂点法線ベクトル */
  normal: Vec3[];
  /** 頂点カラー */
  color: Vec4[];
  /** テクスチャ座標 */
  tex: Vec2[];
  /** 頂点インデックス（gl.TRIANGLES） */
  index: number[];
};

type GeometoryWithoutColor = {
  /** 頂点座標 */
  position: Vec3[];
  /** 頂点法線ベクトル */
  normal: Vec3[];
  /** テクスチャ座標 */
  tex: Vec2[];
  /** 頂点インデックス（gl.TRIANGLES） */
  index: number[];
};

type planeProps = {
  width: number;
  height: number;
  color?: Vec4;
};

/**
 * 板ポリゴンジオメトリー
 * colorの指定がない場合はcolorの頂点情報は持たない
 */
export function plane({
  width,
  height,
  color,
}: Required<planeProps>): Geometory;
export function plane({
  width,
  height,
}: Omit<planeProps, "color">): GeometoryWithoutColor;
export function plane({
  width,
  height,
  color,
}: planeProps): Geometory | GeometoryWithoutColor {
  // ローカル座標系での板ポリゴンを作成する
  const vertexPosition = [
    [-width, height],
    [width, height],
    [-width, -height],
    [width, -height],
  ].map(([x, y]) => [x / 2, y / 2, 0] as Vec3);

  const vertexNormal = [...Array(4).keys()].map(() => [0.0, 0.0, 1.0] as Vec3);

  const vertexTex = [
    [0.0, 0.0] as Vec2,
    [1.0, 0.0] as Vec2,
    [0.0, 1.0] as Vec2,
    [1.0, 1.0] as Vec2,
  ];

  const index = [
    [0, 2, 1],
    [1, 2, 3],
  ].flat();

  if (color === undefined) {
    return {
      position: vertexPosition,
      normal: vertexNormal,
      tex: vertexTex,
      index,
    };
  } else {
    const vertexColor = [...Array(4).keys()].map(() => color);
    return {
      position: vertexPosition,
      normal: vertexNormal,
      color: vertexColor,
      tex: vertexTex,
      index,
    };
  }
}
