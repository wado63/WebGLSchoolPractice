// 2-1 ======================================================================
// グループ機能を使ったオブジェクトの制御
// ============================================================================

import * as THREE from "three";
import { BasicView } from "~/modules/BaseView-day2";

// マテリアルに関するパラメータ
const MATERIAL_PARAM = {
  color: 0x3399ff,
  specular: 0xffffff,
};

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const basicView = new BasicView();

    const geometry = new THREE.TorusGeometry(1.0, 0.4, 32, 32);
    const material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);

    const group = new THREE.Group();

    [...Array(20).keys()].forEach(() => {
      // ジオメトリとマテリアルは使い回せる
      const torus = new THREE.Mesh(geometry, material);
      // 位置をランダムに
      torus.position.x = Math.random() * 10.0 - 5.0;
      torus.position.y = Math.random() * 10.0 - 5.0;
      torus.position.z = Math.random() * 10.0 - 5.0;
      // サイズをランダムに
      const scale = Math.random() * 0.5 + 0.5;
      torus.scale.setScalar(scale);
      group.add(torus);
    });

    basicView.scene.add(group);

    // space押下時のanimation設定
    basicView.animate = () => {
      group.rotation.y += 0.02;
    };

    basicView.render();
    basicView.startRendering();
  },
  false
);
