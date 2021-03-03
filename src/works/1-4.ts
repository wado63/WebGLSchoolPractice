// 1-4 ======================================================================
// Object3Dのプロパティを使った回転
// ============================================================================

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BasicView } from "~/modules/BaseView-day1";

// マテリアルに関するパラメータ
const MATERIAL_PARAM = {
  color: 0xff0000, // マテリアルの持つ色
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
    const material = new THREE.MeshBasicMaterial(MATERIAL_PARAM);
    const box = new THREE.Mesh(geometry, material);

    basicView.scene.add(box);

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
