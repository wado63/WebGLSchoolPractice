// 3-6 ======================================================================
// 月を追尾する人工衛星
// ==========================================================================
import {
  Mesh,
  MeshLambertMaterial,
  SphereGeometry,
  Texture,
  TextureLoader,
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

  basicView.onTick = () => {
    earth.rotation.y += 0.02;

    // 単位化した方向のベクトルの作成
    const directionOfSatelliteToMoon = moon.position
      .clone()
      .sub(satellite.position)
      .normalize();

    satellite.position.add(directionOfSatelliteToMoon.multiplyScalar(0.1));
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
