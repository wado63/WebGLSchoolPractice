// 3-5 ======================================================================
// ベクトルの内積と外積を使ってみる
// ==========================================================================
import {
  Mesh,
  MeshLambertMaterial,
  SphereGeometry,
  Texture,
  TextureLoader,
} from "three";
import { getUnitVector, getVector2Cross, getVector2Dot } from "~/modules/utils";
import { BasicView } from "~/modules/BaseView-day3";
import earthImg from "~/assets/earth.jpg";
import moonImg from "~/assets/moon.jpg";

const main = async () => {
  const basicView = new BasicView();

  // スフィアジオメトリの生成
  const geometry = new SphereGeometry(1.0, 64, 64);

  // テクスチャの読み込み
  const textureLoader = new TextureLoader();
  const [earthTexture, moonTexture] = await Promise.all([
    (await textureLoader.loadAsync(earthImg)) as Texture,
    (await textureLoader.loadAsync(moonImg)) as Texture,
  ]);

  //マテリアルの作成
  const earthMaterial = new MeshLambertMaterial({
    color: 0xffffff,
    map: earthTexture,
  });
  const moonMaterial = new MeshLambertMaterial({
    color: 0xffffff,
    map: moonTexture,
  });

  // メッシュの生成
  const earth = new Mesh(geometry, earthMaterial);
  basicView.scene.add(earth);

  const moon = new Mesh(geometry, moonMaterial);
  // 月は、サイズを小さくし、初期位置を移動させておく
  moon.scale.setScalar(0.5);
  moon.position.set(2.75, 0.0, 0.0);
  basicView.scene.add(moon);

  const satelliteMaterial = new MeshLambertMaterial({
    color: 0x00ffff,
  });
  const satellite = new Mesh(geometry, satelliteMaterial);
  satellite.scale.setScalar(0.2);
  basicView.scene.add(satellite);

  basicView.onTick = () => {
    earth.rotation.y += 0.02;
  };

  basicView.onMouseMove = (x, y) => {
    const [unitX, unitY] = getUnitVector(x, y);
    const MOON_RANGE = 2.75;
    moon.position.set(unitX * MOON_RANGE, 0.0, unitY * MOON_RANGE);

    const dot = getVector2Dot(unitX, unitY, 1.0, 0);
    const cross = getVector2Cross(unitX, unitY, 1.0, 0);
    satellite.position.set(dot, cross, 0.0);
  };

  basicView.startRendering();
};

window.addEventListener(
  "DOMContentLoaded",
  () => {
    void main();
  },
  false
);
