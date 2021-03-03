// 1-5 ======================================================================
//  光源の追加
// ============================================================================

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BasicView } from "~/modules/BaseView-day1";

// マテリアルに関するパラメータ
const MATERIAL_PARAM = {
  color: 0xff0000, // マテリアルの持つ色
};

// ライトに関するパラメータの定義
const DIRECTIONAL_LIGHT_PARAM = {
  color: 0xffffff, // 光の色
  intensity: 1.0, // 光の強度
  x: 1, // 光の向きを表すベクトルの X 要素
  y: 1, // 光の向きを表すベクトルの Y 要素
  z: 1.0, // 光の向きを表すベクトルの Z 要素
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
        this.isDown = e.key === " ";
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

    const geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
    const material = new THREE.MeshLambertMaterial(MATERIAL_PARAM);
    const box = new THREE.Mesh(geometry, material);
    basicView.scene.add(box);

    const directionalLight = new THREE.DirectionalLight(
      DIRECTIONAL_LIGHT_PARAM.color,
      DIRECTIONAL_LIGHT_PARAM.intensity
    );
    directionalLight.position.x = DIRECTIONAL_LIGHT_PARAM.x;
    directionalLight.position.y = DIRECTIONAL_LIGHT_PARAM.y;
    directionalLight.position.z = DIRECTIONAL_LIGHT_PARAM.z;
    basicView.scene.add(directionalLight);

    basicView.onTick = () => {
      if (basicView.isDown) {
        box.rotation.y += 0.05;
        box.rotation.z += 0.05;
      }
    };
    basicView.render();
    basicView.startRendering();
  },
  false
);
