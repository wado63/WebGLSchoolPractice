// 5-1 ======================================================================
// 行列を利用して 3D シーンを描画する
// ==========================================================================
import { BaseView } from "../modules/BaseView-day4";
import vertexShaderSource from "../shader/5-1/main.vert";
import fragmentShaderSource from "../shader/5-1/main.frag";
import { plane } from "~/modules/geometory";
import { lookAt, multiply, perspective, rotate } from "~/modules/matrix";

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

    const planeMesh = plane({
      width: 2.0,
      height: 1.0,
      color: [1.0, 0.3, 0.1, 1.0],
    });

    // 頂点バッファーオブジェクトの作成
    const vertexBufferObjectForPosition = baseView.createVertexBufferObject(
      planeMesh.position.flat()
    );
    const vertexBufferObjectForColor = baseView.createVertexBufferObject(
      planeMesh.color.flat()
    );

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

    const indexBufferObject = baseView.createIndexBufferObject(planeMesh.index);

    baseView.renderingConttext.bindBuffer(
      baseView.renderingConttext.ELEMENT_ARRAY_BUFFER,
      indexBufferObject
    );

    const uniformLocationForMatrix = baseView.renderingConttext.getUniformLocation(
      program,
      "mvpMatrix"
    );

    const startTime = Date.now();

    baseView.render = () => {
      const nowTime = (Date.now() - startTime) / 1000;

      const modelMatrix = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ];

      const mMatrix = rotate(modelMatrix as any, nowTime, [0.0, 1.0, 0.0]);

      // ビュー行列を生成する
      const viewMatrix = lookAt({
        cameraPosition: [0.0, 0.0, 5.0],
        tragetPosition: [0.0, 0.0, 0.0],
        normal: [0.0, 1.0, 0.0],
      });

      // プロジェクション行列を生成する
      // perspectiveで プロジェクション座標変換行列を作成
      const projectionMatrix = perspective({
        fov: 45,
        aspect: canvas.width / canvas.height,
        near: 0.1,
        far: 10.0,
      });

      const vpMatrix = multiply(projectionMatrix, viewMatrix);
      const mvpMatrix = multiply(vpMatrix, mMatrix as any);

      baseView.renderingConttext.uniformMatrix4fv(
        uniformLocationForMatrix,
        false,
        mvpMatrix.flat()
      );
      // indexBufferの場合はdrawElementsを使用する
      baseView.renderingConttext.drawElements(
        baseView.renderingConttext.TRIANGLES,
        planeMesh.index.length,
        baseView.renderingConttext.UNSIGNED_SHORT,
        0
      );
    };

    baseView.startRendering();
  },
  false
);
