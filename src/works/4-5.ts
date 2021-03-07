// 4-5 ======================================================================
// インデックスバッファを使った描画
// ==========================================================================
import { BaseView } from "../modules/BaseView-day4";
import vertexShaderSource from "../shader/4-5/main.vert";
import fragmentShaderSource from "../shader/4-5/main.frag";

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

    const baseView = new BaseView(canvas);

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

    const position = [...Array(5).keys()]
      .map((index) => {
        const radian = (2 * Math.PI * index) / 5 + Math.PI / 2;
        return [Math.cos(radian), Math.sin(radian), 0].map(
          (position) => 0.7 * position
        );
      })
      .flat();

    const color = [
      [1.0, 0.0, 0.0, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
      [204 / 255, 1.0, 0.0, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
      [0.0, 1.0, 102 / 255, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
      [0.0, 102 / 255, 1, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
      [204 / 255, 0.0, 1.0, 1.0], // RGBA を 0.0 ～ 1.0 の値で表現
    ].flat();

    // 頂点バッファーオブジェクトの作成
    const vertexBufferObjectForPosition = baseView.createVertexBufferObject(
      position
    );
    const vertexBufferObjectForColor = baseView.createVertexBufferObject(color);

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

    // 参照したい頂点のindexの番号を指定する。
    const indexes = [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 4],
    ].flat();

    const indexBufferObject = baseView.createIndexBufferObject(indexes);

    baseView.renderingConttext.bindBuffer(
      baseView.renderingConttext.ELEMENT_ARRAY_BUFFER,
      indexBufferObject
    );

    const mouseUniformLocation = baseView.renderingConttext.getUniformLocation(
      program,
      "mouse"
    );

    baseView.onMouseMove = (x, y) => {
      baseView.renderingConttext.uniform2fv(mouseUniformLocation, [x, y]);
      console.log(x, y);
    };

    baseView.render = () => {
      // indexBufferの場合はdrawElementsを使用する
      baseView.renderingConttext.drawElements(
        baseView.renderingConttext.TRIANGLES,
        indexes.length,
        baseView.renderingConttext.UNSIGNED_SHORT,
        0
      );
    };

    baseView.startRendering();
  },
  false
);
