// 4-1 ======================================================================
// pureなWebGlによる描画
// ==========================================================================
import { BaseView } from "../modules/BaseView-day4";
import vertexShaderSource from "../shader/4-1/main.vert";
import fragmentShaderSource from "../shader/4-1/main.frag";

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

    const position = [
      [0.0, 0.5, 0.0],
      [0.5, -0.5, 0.0],
      [-0.5, -0.5, 0.0],
    ].flat();

    // 頂点バッファーオブジェクトの作成
    const vertexBufferObject = baseView.createVertexBufferObject(position);

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
    baseView.enableAttribute(vertexBufferObject, positionLocation, 3);

    baseView.resetCanvas();

    // 第一引数がどのような図形として描画するか（プリミティブタイプ）
    // TRIANGLES -> 三角形ポリゴン（頂点３個ワンセットで一つの三角形）
    // 第二引数が、開始位置(０で、頂点定義の最初から)
    // 第三引数が、頂点の個数
    baseView.renderingConttext.drawArrays(
      baseView.renderingConttext.TRIANGLES,
      0,
      position.length / 3
    );
  },
  false
);
