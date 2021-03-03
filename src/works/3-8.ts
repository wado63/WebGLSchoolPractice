// 3-8 ======================================================================
// 月を目指すロケット(クォータ二オン)
// ==========================================================================
import {
  ConeGeometry,
  Mesh,
  MeshLambertMaterial,
  Quaternion,
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

  const rocketGeometry = new ConeGeometry(0.2, 0.5, 32);
  const rocketMaterial = new MeshLambertMaterial({
    color: 0x00ffff,
  });
  const rocket = new Mesh(rocketGeometry, rocketMaterial);
  basicView.scene.add(rocket);

  const directionOfRocket = new Vector3(0.0, 1, 0.0).normalize();

  basicView.onTick = () => {
    earth.rotation.y += 0.02;

    const previousDirectionOfRocket = directionOfRocket.clone();

    // 単位化した方向のベクトルの作成
    const directionFromRocketToMoon = moon.position
      .clone()
      .sub(rocket.position)
      .normalize();

    // 現在の衛星の進行方向に先のベクトルを追加して再度、単位化する
    directionOfRocket
      .add(directionFromRocketToMoon.multiplyScalar(0.1))
      .normalize();

    rocket.position.add(directionOfRocket.clone().multiplyScalar(0.05));

    const dot = previousDirectionOfRocket.dot(directionOfRocket);
    const cross = previousDirectionOfRocket.cross(directionOfRocket);
    const radians = Math.acos(dot);
    const quaternion = new Quaternion();
    quaternion.setFromAxisAngle(cross.normalize(), radians);

    rocket.quaternion.premultiply(quaternion);
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
