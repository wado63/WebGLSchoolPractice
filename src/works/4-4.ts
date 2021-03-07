// 4-4 ======================================================================
// 三角形から五角形を作ってみよう
// ==========================================================================
import { BaseView } from "../modules/BaseView-day4";
import vertexShaderSource from "../shader/4-4/main.vert";
import fragmentShaderSource from "../shader/4-4/main.frag";

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const canvas = document.createElement("canvas");
    const size = Math.min(window.innerWidth, window.innerHeight);
    Object.assign(canvas, {
      width: size,
      height: size,
    });
    document.body.appendChild(canvas);

    /**
     * 0番目の座標を軸とし、多角形を三角形に分割した際の頂点座標を作成する
     */
    const devideTrianglePosition = (positions: number[][]): number[] =>
      positions
        .reduce<number[][]>((a, c, index, array) => {
          if (index + 2 >= array.length) return a;
          const point0 = array[0];
          const point1 = array[index + 1];
          const point2 = array[index + 2];
          return [...a, point0, point1, point2];
        }, [])
        .flat();

    const originalPosition = [...Array(5).keys()].map((index) => {
      const radian = (2 * Math.PI * index) / 5 + Math.PI / 2;
      return [Math.cos(radian), Math.sin(radian), 0].map(
        (position) => 0.7 * position
      );
    });

    // 頂点に付与する色の頂点属性用データを定義する
    const originalColor = [
      [1.0, 0.0, 0.0, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
      [204 / 255, 1.0, 0.0, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
      [0.0, 1.0, 102 / 255, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
      [0.0, 102 / 255, 1, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
      [204 / 255, 0.0, 1.0, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
    ];

    const position = devideTrianglePosition(originalPosition);
    const color = devideTrianglePosition(originalColor);

    // TRIANGLE_FANで出力する場合、必要最低限の頂点座標で表示できる

    // const position = [...Array(5).keys()]
    //   .map((index) => {
    //     const radian = (2 * Math.PI * index) / 5 + Math.PI / 2;
    //     return [Math.cos(radian), Math.sin(radian), 0].map(
    //       (position) => 0.7 * position
    //     );
    //   })
    //   .flat();

    // const color = [
    //   [1.0, 0.0, 0.0, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
    //   [204 / 255, 1.0, 0.0, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
    //   [0.0, 1.0, 102 / 255, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
    //   [0.0, 102 / 255, 1, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
    //   [204 / 255, 0.0, 1.0, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
    // ].flat();

    const baseView = new BaseView(canvas);

    // 頂点バッファーオブジェクトの作成
    const vertexBufferObjectForPosition = baseView.createVertexBufferObject(
      position
    );
    const vertexBufferObjectForColor = baseView.createVertexBufferObject(color);

    // 頂点シェーダーの作成
    const vertexShader = baseView.createShaderObject(
      vertexShaderSource,
      "VERTEX_SHADER"
    );

    // フラグメント(ピクセル)シェーダーの作成
    const fragmentShader = baseView.createShaderObject(
      fragmentShaderSource,
      "FRAGMENT_SHADER"
    );

    // シェーダー同士を紐付けたプログラムオブジェクトの作成
    const program = baseView.createProgramObject(vertexShader, fragmentShader);

    // このプログラムオブジェクトを使いますよ→this.renderingConttext.useProgram(program);
    // 今から利用するプログラムオブジェクトを明示的に指定するには
    // useProgramを利用すれば良い
    baseView.renderingConttext.useProgram(program);

    // shaderで使用している変数の参照を取得する
    const positionLocation = baseView.renderingConttext.getAttribLocation(
      program,
      "position"
    );

    // ArrayBufferに作成しておいた頂点バッファーを紐付ける
    baseView.enableAttribute(
      vertexBufferObjectForPosition,
      positionLocation,
      3
    );

    // shaderで使用している変数の参照を取得する
    const colorLocation = baseView.renderingConttext.getAttribLocation(
      program,
      "color"
    );
    baseView.enableAttribute(vertexBufferObjectForColor, colorLocation, 4);

    const mouseUniformLocation = baseView.renderingConttext.getUniformLocation(
      program,
      "mouse"
    );

    baseView.onMouseMove = (x, y) => {
      baseView.renderingConttext.uniform2fv(mouseUniformLocation, [x, y]);
      console.log(x, y);
    };

    baseView.render = () => {
      // 第一引数がどのような図形として描画するか（プリミティブタイプ）
      // TRIANGLES -> 三角形ポリゴン（頂点３個ワンセットで一つの三角形）
      // 第二引数が、開始位置(０で、頂点定義の最初から)
      // 第三引数が、頂点の個数
      baseView.renderingConttext.drawArrays(
        baseView.renderingConttext.TRIANGLES,
        0,
        position.length / 3
      );
    };

    baseView.startRendering();
  },
  false
);
