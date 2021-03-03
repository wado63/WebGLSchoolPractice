// 2-5 ======================================================================
// 素体ジオメトリでパーティクル表現
// ============================================================================

import * as THREE from "three";
import { BasicView } from "~/modules/BaseView-day2";

const MATERIAL_PARAM_POINT = {
  color: 0x000000, // 頂点の色
  size: 1, // 頂点の基本となるサイズ
  sizeAttenuation: false, // 遠近感を出すかどうかの真偽値
};

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const basicView = new BasicView();

    const material = new THREE.PointsMaterial(MATERIAL_PARAM_POINT);

    const geometry = new THREE.Geometry();

    const positions = [...Array(10).keys()]
      .map((x) => {
        return [...Array(10).keys()].map((y) => [x, y]);
      })
      .flat()
      .map(([x, y]) => new THREE.Vector3(0.1 * x, 0.1 * y, 0.0));

    geometry.vertices = positions;

    const particles = new THREE.Points(geometry, material);

    basicView.scene.add(particles);

    // space押下時のanimation設定
    basicView.animate = () => {
      // override
    };

    basicView.render();
    basicView.startRendering();
  },
  false
);
