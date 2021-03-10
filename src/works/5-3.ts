// 5-3 ======================================================================
//  フェイスカリングを利用する
// ==========================================================================
import Tweakpane from "tweakpane";
import { BaseView } from "../modules/BaseView-day4";
import vertexShaderSource from "../shader/5-3/main.vert";
import fragmentShaderSource from "../shader/5-3/main.frag";
import { plane } from "~/modules/geometory";
import {
  mat4FromYRotation,
  mat4Identity,
  mat4LookAt,
  mat4Multiply,
  mat4Perspective,
  vec3FromValues,
} from "~/modules/extendsGlMatrix";

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const config = {
      faceCulling: false,
    };
    const pane = new Tweakpane();
    pane.addInput(config, "faceCulling");
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

    const planeMesh = plane({
      width: 2.0,
      height: 1.0,
      color: [1.0, 0.3, 0.1, 1.0],
    });
    // 頂点バッファーオブジェクトの作成
    const vertexBufferObjectForPosition = baseView.createVertexBufferObject(
      planeMesh.position.flat()
    );

    // 板ポリゴン表示のためのインデックスbufferを作成
    const indexBufferObject = baseView.createIndexBufferObject(planeMesh.index);

    // shaderで使用している変数の参照を取得する
    const positionLocation = baseView.renderingConttext.getAttribLocation(
      program,
      "position"
    );

    // matrix変数の参照を取得
    const uniformLocationForMatrix = baseView.renderingConttext.getUniformLocation(
      program,
      "mvpMatrix"
    );

    // color変数の参照を取得
    const uniformLocationForColor = baseView.renderingConttext.getUniformLocation(
      program,
      "globalColor"
    );

    // ビュー行列を生成する
    const viewMatrix = mat4LookAt({
      eye: vec3FromValues(0.0, 3.0, 5.0),
      center: vec3FromValues(0.0, 0.0, 0.0),
      up: vec3FromValues(0.0, 1.0, 0.0),
    });

    // プロジェクション行列を生成する
    // perspectiveで プロジェクション座標変換行列を作成
    const projectionMatrix = mat4Perspective({
      fovy: 45,
      aspect: canvas.width / canvas.height,
      near: 0.1,
      far: 10.0,
    });

    const renderMesh = (
      time: number,
      color: [number, number, number, number]
    ) => {
      // ArrayBufferに作成しておいた頂点bufferを紐付ける
      baseView.enableAttribute(
        vertexBufferObjectForPosition,
        positionLocation,
        3
      );

      // IndexBufferに作成しておいたIndex bufferを紐付ける
      baseView.renderingConttext.bindBuffer(
        baseView.renderingConttext.ELEMENT_ARRAY_BUFFER,
        indexBufferObject
      );

      // m, vp, mvp行列の作成
      const modelMatrix = mat4FromYRotation(time);
      const vpMatrix = mat4Multiply(projectionMatrix, viewMatrix);
      const mvpMatrix = mat4Multiply(vpMatrix, modelMatrix);

      // 作成した行列をuniform変数でgpuに連携
      baseView.renderingConttext.uniformMatrix4fv(
        uniformLocationForMatrix,
        false,
        mvpMatrix
      );
      // 色をuniform変数でgpuに連携
      baseView.renderingConttext.uniform4fv(uniformLocationForColor, color);

      // indexBufferの場合はdrawElementsを使用する
      baseView.renderingConttext.drawElements(
        baseView.renderingConttext.TRIANGLES,
        planeMesh.index.length,
        baseView.renderingConttext.UNSIGNED_SHORT,
        0
      );
    };

    const startTime = Date.now();

    baseView.render = () => {
      // フラグの状態に応じてカリングを設定する @@@
      config.faceCulling === true
        ? baseView.renderingConttext.enable(
            baseView.renderingConttext.CULL_FACE
          )
        : baseView.renderingConttext.disable(
            baseView.renderingConttext.CULL_FACE
          );

      const nowTime = (Date.now() - startTime) / 1000;
      renderMesh(nowTime, [0, 1, 0, 1]);
    };

    baseView.startRendering();
  },
  false
);
