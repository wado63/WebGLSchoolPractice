// 1-10 ======================================================================
// material, geometoryの再利用
// ============================================================================

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BasicView } from "~/modules/BaseView";

class OrbitView extends BasicView {
  constructor() {
    super();
    const axesHelper = new THREE.AxesHelper(5.0);
    this.scene.add(axesHelper);
    new OrbitControls(this.camera, this.renderer.domElement);
  }
}

// マテリアルに関するパラメータ
const MATERIAL_PARAM = {
  color: 0xff0000, // マテリアルの持つ色
};

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const basicView = new OrbitView();
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial(MATERIAL_PARAM);

    [...Array(10).keys()].forEach(() => {
      const box = new THREE.Mesh(geometry, material);
      box.position.x = Math.random() * 1 - 0.5;
      box.position.y = Math.random() * 1 - 0.5;
      box.position.z = Math.random() * 1 - 0.5;
      basicView.scene.add(box);
    });

    basicView.render();
    basicView.startRendering();
  },
  false
);
