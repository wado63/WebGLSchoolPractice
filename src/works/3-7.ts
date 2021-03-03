// 3-7 ======================================================================
// 月を追尾する人工衛星（改）
// ==========================================================================
import {
  Mesh,
  MeshLambertMaterial,
  SphereGeometry,
  Texture,
  TextureLoader,
  Vector3,
} from "three";
import { getUnitVector } from "~/modules/utils";
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
  basicView.scene.add(moon);

  const satelliteMaterial = new MeshLambertMaterial({
    color: 0x00ffff,
  });
  const satellite = new Mesh(geometry, satelliteMaterial);
  satellite.scale.setScalar(0.2);
  basicView.scene.add(satellite);

  const directionOfSattelite = new Vector3(0.0, 1, 0.0);

  basicView.onTick = () => {
    earth.rotation.y += 0.02;

    // 単位化した方向のベクトルの作成
    const directionFromSatelliteToMoon = moon.position
      .clone()
      .sub(satellite.position)
      .normalize();

    // 現在の衛星の進行方向に先のベクトルを追加して再度、単位化する
    directionOfSattelite
      .add(directionFromSatelliteToMoon.multiplyScalar(0.1))
      .normalize();

    satellite.position.add(directionOfSattelite.clone().multiplyScalar(0.05));
  };

  basicView.onMouseMove = (x, y) => {
    const [unitX, unitY] = getUnitVector(x, y);
    const MOON_RANGE = 2.75;
    moon.position.set(unitX * MOON_RANGE, 0.0, unitY * MOON_RANGE);
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
