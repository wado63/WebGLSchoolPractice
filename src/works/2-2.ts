// 2-2 ======================================================================
// Raycaster
// ============================================================================

import * as THREE from "three";
import { ValuesType } from "utility-types";
import { BasicView } from "~/modules/BaseView-day2";

// マテリアルに関するパラメータ
const MATERIAL_PARAM = {
  color: 0x3399ff,
  specular: 0xffffff,
};

// クリック時用マテリアルのパラメータ
const MATERIAL_PARAM_SELECTED = {
  color: 0xff3399,
  specular: 0xffffff,
};

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const basicView = new BasicView();

    const raycaster = new THREE.Raycaster();

    const geometry = new THREE.TorusGeometry(1.0, 0.4, 32, 32);
    const material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);
    const selectedMaterial = new THREE.MeshPhongMaterial(
      MATERIAL_PARAM_SELECTED
    );

    const group = new THREE.Group();

    const torusArray = [...Array(20).keys()].map(() => {
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

    basicView.onClick = (x, y) => {
      // 座標系が異なるので、yは反転して利用する。
      const vector = new THREE.Vector2(x, -y);
      // レイキャスターに正規化済みマウス座標とカメラを指定する
      raycaster.setFromCamera(vector, basicView.camera);
      const intersects = raycaster.intersectObjects(torusArray);

      // レイが交差しなかった場合を考慮し一度マテリアルをリセット
      torusArray.forEach((mesh) => {
        mesh.material = material;
      });

      // レイが交差したメッシュのマテリアルを差し替える
      intersects.forEach((e) => {
        (e.object as ValuesType<typeof torusArray>).material = selectedMaterial;
      });
    };

    basicView.render();
    basicView.startRendering();
  },
  false
);
