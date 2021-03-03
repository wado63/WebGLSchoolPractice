// 1-9 ======================================================================
// さまざまなマテリアル
// ============================================================================

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BasicView } from "~/modules/BaseView-day1";

// マテリアルに関するパラメータ
const MATERIAL_PARAM = {
  color: 0x00ffff, // マテリアルの持つ色
  specular: 0xffffff, // 反射光の成分 directionalLightに合わせると自然に見える
};

// ポイント専用マテリアルのパラメータ
const MATERIAL_PARAM_POINT = {
  color: 0xffff00, // マテリアル自体の色
  size: 0.2, // 点の大きさ
};

// ライトに関するパラメータの定義
const DIRECTIONAL_LIGHT_PARAM = {
  color: 0xffffff, // 光の色
  intensity: 0.8, // 光の強度
  x: 1.0, // 光の向きを表すベクトルの X 要素
  y: 1.0, // 光の向きを表すベクトルの Y 要素
  z: 1.0, // 光の向きを表すベクトルの Z 要素
};

// アンビエントライトに関するパラメータの定義
const AMBIENT_LIGHT_PARAM = {
  color: 0xffffff, // 光の色
  intensity: 0.4, // 光の強度
};

class OrbitView extends BasicView {
  public isDown = false;
  constructor() {
    super();
    const axesHelper = new THREE.AxesHelper(5.0);
    this.scene.add(axesHelper);
    new OrbitControls(this.camera, this.renderer.domElement);

    window.addEventListener(
      "keydown",
      (e) => {
        this.isDown = e.key === " "; //space
      },
      false
    );

    window.addEventListener(
      "keyup",
      () => {
        this.isDown = false;
      },
      false
    );
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const basicView = new OrbitView();

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(
      DIRECTIONAL_LIGHT_PARAM.color,
      DIRECTIONAL_LIGHT_PARAM.intensity
    );
    directionalLight.position.x = DIRECTIONAL_LIGHT_PARAM.x;
    directionalLight.position.y = DIRECTIONAL_LIGHT_PARAM.y;
    directionalLight.position.z = DIRECTIONAL_LIGHT_PARAM.z;
    basicView.scene.add(directionalLight);

    // 環境光
    const ambientLight = new THREE.AmbientLight(
      AMBIENT_LIGHT_PARAM.color,
      AMBIENT_LIGHT_PARAM.intensity
    );
    basicView.scene.add(ambientLight);

    // フォンシェーディング用のマテリアルを作成
    const material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);

    const pointMaterial = new THREE.PointsMaterial(MATERIAL_PARAM_POINT);

    // 長方形
    const boxGeometry = new THREE.BoxGeometry(1.0, 2.0, 3.0);
    const box = new THREE.Mesh(boxGeometry, material);
    const boxLine = new THREE.LineSegments(
      new THREE.EdgesGeometry(boxGeometry),
      new THREE.LineBasicMaterial({ linewidth: 1, color: 0xff00ff })
    );

    box.position.x = 2.0;
    box.position.z = -2.0;
    basicView.scene.add(box);

    boxLine.position.x = 2.0;
    boxLine.position.z = -2.0;
    basicView.scene.add(boxLine);

    // スフィアジオメトリの生成とメッシュ化 (半径、横の分割数、縦の分割数
    const sphereGeometry = new THREE.SphereGeometry(1.0, 16, 16);
    const sphere = new THREE.Points(sphereGeometry, pointMaterial);
    sphere.position.x = 2.0;
    sphere.position.z = 2.0;
    basicView.scene.add(sphere);

    // コーンジオメトリの生成とメッシュ化
    const coneGeometry = new THREE.ConeGeometry(1.0, 1.5, 100);
    const cone = new THREE.Mesh(coneGeometry, material);
    cone.position.x = -2.0;
    cone.position.z = 2.0;
    basicView.scene.add(cone);

    // トーラスジオメトリの生成とメッシュ化
    const torusGeometry = new THREE.TorusGeometry(1.0, 0.4, 32, 32);
    const torus = new THREE.Line(torusGeometry, material);
    torus.position.x = -2.0;
    torus.position.z = -2.0;
    basicView.scene.add(torus);

    basicView.onTick = () => {
      if (basicView.isDown) {
        box.rotation.y += 0.05;
        box.rotation.z += 0.05;
        boxLine.rotation.y += 0.05;
        boxLine.rotation.z += 0.05;
      }
    };
    basicView.render();
    basicView.startRendering();
  },
  false
);
