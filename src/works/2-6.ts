// 2-6 ======================================================================
// 大量のパーティクルを乱数で生成する
// ============================================================================

import * as THREE from "three";
import { BasicView } from "~/modules/BaseView-day2";

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const basicView = new BasicView();
    basicView.renderer.setClearColor(0x0000000);

    const material = new THREE.PointsMaterial({
      color: 0xff9933, // 頂点の色
      size: 1, // 頂点の基本となるサイズ
      sizeAttenuation: false, // 遠近感を出すかどうかの真偽値
    });

    const geometry = new THREE.Geometry();
    const SIZE = 10.0; // どの程度の範囲に配置するかのサイズ
    const positions = [...Array(100000).keys()].map(() => {
      return new THREE.Vector3(
        (Math.random() - 0.5) * 2.0 * SIZE,
        (Math.random() - 0.5) * 2.0 * SIZE,
        (Math.random() - 0.5) * 2.0 * SIZE
      );
    });
    geometry.vertices = positions;

    const particles = new THREE.Points(geometry, material);
    basicView.scene.add(particles);

    // 毎フレームごとの処理
    basicView.onTick = () => {
      particles.rotation.x += 0.00025;
      particles.rotation.y += 0.00075;
    };

    basicView.render();
    basicView.startRendering();
  },
  false
);
