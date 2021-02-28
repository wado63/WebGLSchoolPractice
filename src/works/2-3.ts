// 2-3 ======================================================================
// フォグの追加
// ============================================================================

import * as THREE from "three";
import { BasicView } from "~/modules/BaseView2";

// シーンに適用するパラメータ
const SCENE_PARAM = {
  fogColor: 0x000000, // フォグの色
  fogNear: 5.0, // フォグの掛かり始めるカメラからの距離
  fogFar: 15.0, // フォグが完全に掛かるカメラからの距離
};

// レンダラに関するパラメータ
const RENDERER_PARAM = {
  clearColor: 0x000000, // 背景クリアの色とフォグの色を合わせるように！ @@@
};

// マテリアルに関するパラメータ
const MATERIAL_PARAM = {
  color: 0x3399ff,
  specular: 0xffffff,
};

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const basicView = new BasicView();

    basicView.renderer.setClearColor(RENDERER_PARAM.clearColor);

    basicView.scene.fog = new THREE.Fog(
      SCENE_PARAM.fogColor,
      SCENE_PARAM.fogNear,
      SCENE_PARAM.fogFar
    );

    const geometry = new THREE.TorusGeometry(1.0, 0.4, 32, 32);
    const material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);

    const group = new THREE.Group();

    [...Array(20).keys()].map(() => {
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

      return torus;
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
