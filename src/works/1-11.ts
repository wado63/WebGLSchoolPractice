// 1-11 ======================================================================
//  宿題 100個のの要素を線対象に配置する
// ============================================================================

import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BasicView } from "~/modules/BaseView-day1";

// マテリアルに関するパラメータ
const MATERIAL_PARAM = {
  color: 0x00ffff, // マテリアルの持つ色
  specular: 0xffffff, // 反射光の成分 directionalLightに合わせると自然に見える
};

// ライトに関するパラメータの定義
const DIRECTIONAL_LIGHT_PARAM = {
  color: 0xffffff, // 光の色
  intensity: 0.8, // 光の強度
  x: 1.0, // 光の向きを表すベクトルの X 要素
  y: 1.0, // 光の向きを表すベクトルの Y 要素
  z: 1.0, // 光の向きを表すベクトルの Z 要素
};

// アンビエントライトに関するパラメータの定義
const AMBIENT_LIGHT_PARAM = {
  color: 0xffffff, // 光の色
  intensity: 0.4, // 光の強度
};

class OrbitView extends BasicView {
  public isDown = false;
  public isReverse = false;
  constructor() {
    super();
    const axesHelper = new THREE.AxesHelper(5.0);
    this.scene.add(axesHelper);
    new OrbitControls(this.camera, this.renderer.domElement);

    window.addEventListener(
      "keydown",
      (e) => {
        this.isDown = e.key === " "; //space
      },
      false
    );

    window.addEventListener(
      "keyup",
      () => {
        this.isDown = false;
        this.isReverse = true;
      },
      false
    );
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const basicView = new OrbitView();

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(
      DIRECTIONAL_LIGHT_PARAM.color,
      DIRECTIONAL_LIGHT_PARAM.intensity
    );
    directionalLight.position.x = DIRECTIONAL_LIGHT_PARAM.x;
    directionalLight.position.y = DIRECTIONAL_LIGHT_PARAM.y;
    directionalLight.position.z = DIRECTIONAL_LIGHT_PARAM.z;
    basicView.scene.add(directionalLight);

    // 環境光
    const ambientLight = new THREE.AmbientLight(
      AMBIENT_LIGHT_PARAM.color,
      AMBIENT_LIGHT_PARAM.intensity
    );
    basicView.scene.add(ambientLight);

    // フォンシェーディング用のマテリアルを作成
    const material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);

    // boxのジオメトリを作成
    const boxGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

    // [0.0, 0.0] から [1.0, 1.0]までの２次元配列を作成する
    const positions = [...Array(10).keys()]
      .map((x) => {
        return [...Array(10).keys()].map((y) => [x, y]);
      })
      .flat()
      .map(([x, y]) => [0.1 * x, 0.1 * y]);

    const group = new THREE.Group();
    group.position.x = -0.45;
    group.position.y = -0.45;

    // ２次元配列からmeshを作成し、group化
    const boxes = positions.map(([x, y]) => {
      const box = new THREE.Mesh(boxGeometry, material);
      box.position.x = x;
      box.position.y = y;
      group.add(box);
      return box;
    });

    basicView.scene.add(group);

    basicView.onTick = () => {
      if (basicView.isDown) {
        boxes.forEach((box) => {
          box.rotation.y += 0.05;
          box.rotation.z += 0.05;
        });
      } else if (basicView.isReverse) {
        gsap.to(
          boxes.map((box) => box.rotation), //配列でオブジェクトを指定できる
          {
            duration: 0.5,
            y: 0,
            z: 0,
          }
        );
        basicView.isReverse = false;
      }
    };
    basicView.render();
    basicView.startRendering();
  },
  false
);
