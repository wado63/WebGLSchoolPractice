// = 002 ======================================================================
// OrbitControls
// ============================================================================

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BasicView } from "~/modules/BaseView-day1";

// マテリアルに関するパラメータ
const MATERIAL_PARAM = {
  color: 0xff0000, // マテリアルの持つ色
};

class OrbitView extends BasicView {
  constructor() {
    super();
    new OrbitControls(this.camera, this.renderer.domElement);
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
    basicView.render();
    basicView.startRendering();
  },
  false
);
