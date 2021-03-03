// 2-4 ======================================================================
// テクスチャの追加
// ==========================================================================
import textureImage from "~/assets/sample.jpg";
import * as THREE from "three";
import { BasicView } from "~/modules/BaseView-day2";

// マテリアルに関するパラメータ
const MATERIAL_PARAM = {
  // color: 0x3399ff,
  specular: 0xffffff,
};

window.addEventListener(
  "DOMContentLoaded",
  () => {
    (async function () {
      const basicView = new BasicView();

      const material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);
      material.side = THREE.DoubleSide; // 裏表関係なく両面が描画される
      const loader = new THREE.TextureLoader();
      const texture = (await loader.loadAsync(textureImage)) as THREE.Texture;
      // 読み込みができていない場合は黒く塗りつぶされてたマテリアルが表示される。
      // const texture = loader.load(textureImage);
      material.map = texture;

      const group = new THREE.Group();

      // プレーンジオメトリの生成とメッシュ化
      const planeGeometry = new THREE.PlaneGeometry(2.0, 2.0);
      const plane = new THREE.Mesh(planeGeometry, material);
      plane.position.x = -2.0;
      plane.position.z = 2.0;
      group.add(plane);
      // スフィアジオメトリの生成とメッシュ化
      const sphereGeometry = new THREE.SphereGeometry(1.0, 16, 16);
      const sphere = new THREE.Mesh(sphereGeometry, material);
      sphere.position.x = 2.0;
      sphere.position.z = 2.0;
      group.add(sphere);
      // ボックスジオメトリの生成とメッシュ化
      const BoxGeometry = new THREE.BoxGeometry(1.0, 2.0, 3.0);
      const box = new THREE.Mesh(BoxGeometry, material);
      box.position.x = 2.0;
      box.position.z = -2.0;
      group.add(box);
      // トーラスジオメトリの生成とメッシュ化
      const torusGeometry = new THREE.TorusGeometry(1.0, 0.4, 32, 32);
      const torus = new THREE.Mesh(torusGeometry, material);
      torus.position.x = -2.0;
      torus.position.z = -2.0;
      group.add(torus);

      basicView.scene.add(group);

      // space押下時のanimation設定
      basicView.animate = () => {
        group.rotation.y += 0.02;
      };

      basicView.render();
      basicView.startRendering();
    })();
  },
  false
);
