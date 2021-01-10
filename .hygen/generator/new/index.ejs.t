---
to: src/works/<%= name %>.ts
---

// <%= name %> ======================================================================
// FIXME: description
// ============================================================================

import * as THREE from "three";
import { BasicView } from "~/modules/BaseView";

// マテリアルに関するパラメータ
const MATERIAL_PARAM = {
  color: 0xff0000, // マテリアルの持つ色
};

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const basicView = new BasicView();
    const geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
    const material = new THREE.MeshBasicMaterial(MATERIAL_PARAM);
    const box = new THREE.Mesh(geometry, material);
    basicView.scene.add(box);
    basicView.render();
    basicView.startRendering();
  },
  false
);
