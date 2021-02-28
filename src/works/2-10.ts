// 2-10 ======================================================================
// コンポーザーに複数のパスを追加する BaseView2Ver2
// ==========================================================================
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass";
import { BasicView } from "~/modules/BaseView2Ver2";
import textureImage from "~/assets/sample.jpg";
import {
  BoxGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
  SphereGeometry,
  Texture,
  TextureLoader,
  TorusGeometry,
} from "three";

const main = async () => {
  const basicView = new BasicView();

  const material = new MeshPhongMaterial({
    specular: 0xffffff,
  });
  material.side = DoubleSide; // 裏表関係なく両面が描画される
  const loader = new TextureLoader();
  const texture = (await loader.loadAsync(textureImage)) as Texture;
  // 読み込みができていない場合は黒く塗りつぶされてたマテリアルが表示される。
  // const texture = loader.load(textureImage);
  material.map = texture;

  const group = new Group();

  // プレーンジオメトリの生成とメッシュ化
  const planeGeometry = new PlaneGeometry(2.0, 2.0);
  const plane = new Mesh(planeGeometry, material);
  plane.position.x = -2.0;
  plane.position.z = 2.0;
  group.add(plane);
  // スフィアジオメトリの生成とメッシュ化
  const sphereGeometry = new SphereGeometry(1.0, 16, 16);
  const sphere = new Mesh(sphereGeometry, material);
  sphere.position.x = 2.0;
  sphere.position.z = 2.0;
  group.add(sphere);
  // ボックスジオメトリの生成とメッシュ化
  const boxGeometry = new BoxGeometry(1.0, 2.0, 3.0);
  const box = new Mesh(boxGeometry, material);
  box.position.x = 2.0;
  box.position.z = -2.0;
  group.add(box);
  // トーラスジオメトリの生成とメッシュ化
  const torusGeometry = new TorusGeometry(1.0, 0.4, 32, 32);
  const torus = new Mesh(torusGeometry, material);
  torus.position.x = -2.0;
  torus.position.z = -2.0;
  group.add(torus);

  basicView.scene.add(group);

  const glitchPass = new GlitchPass();
  basicView.composer.addPass(glitchPass);

  const dotScreenPass = new DotScreenPass();
  basicView.composer.addPass(dotScreenPass);

  // space押下時のanimation設定
  basicView.animate = () => {
    group.rotation.y += 0.02;
  };

  basicView.render();
  basicView.startRendering();
};

window.addEventListener(
  "DOMContentLoaded",
  () => {
    void main();
  },
  false
);
