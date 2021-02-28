// 2-7 ======================================================================
// ポイントスプライトとマテリアル設定
// ============================================================================

import * as THREE from "three";
import { BasicView } from "~/modules/BaseView2";
import starImg from "~/assets/star.png";

const basicView = new BasicView();
basicView.renderer.setClearColor(0x0000000);

const material = new THREE.PointsMaterial({
  color: 0xff9933, // 頂点の色
  size: 10, // 頂点の基本となるサイズ
  sizeAttenuation: false, // 遠近感を出すかどうかの真偽値
  opacity: 0.8, // 不透明度
  transparent: true, // 透明度を有効化するかどうか
  blending: THREE.AdditiveBlending, // 加算合成モードで色を混ぜる
  depthWrite: false, // 深度値を書き込むかどうか
});

const loader = new THREE.TextureLoader();
const texture = loader.load(starImg);
material.map = texture;

const geometry = new THREE.Geometry();
const SIZE = 10.0; // どの程度の範囲に配置するかのサイズ
const positions = [...Array(5000).keys()].map(() => {
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
