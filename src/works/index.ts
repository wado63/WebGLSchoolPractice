const html = `
  <p><a href="./1-1.html">1-1: three.js 利用時のベースになる基本実装</a></p>
  <p><a href="./1-2.html">1-2: OrbitControls でインタラクティブに操作</a></p>
  <p><a href="./1-3.html">1-3: AxisHelper を追加して XYZ 軸を可視化</a></p>
  <p><a href="./1-4.html">1-4: 3D オブジェクトに干渉する（Object3D）</a></p>
  <p><a href="./1-5.html">1-5: ディレクショナルライト（平行光源）</a></p>
  <p><a href="./1-6.html">1-6: アンビエントライト（環境光）</a></p>
  <p><a href="./1-7.html">1-7: 反射光を取り入れたフォンシェーディング</a></p>
  <p><a href="./1-8.html">1-8: three.js の様々なビルトインジオメトリ</a></p>
  <p><a href="./1-9.html">1-9: ラインオブジェクトやポイントオブジェクト</a></p>
  <p><a href="./1-10.html">1-10: material, geometoryの再利用</a></p>
  <p><a href="./1-11.html">1-11: 宿題</a></p>
  <p><a href="./2-1.html">2-1: グループ機能を使ったオブジェクトの制御</a></p>
  <p><a href="./2-2.html">2-2: RayCaster</a></p>
  <p><a href="./2-3.html">2-3: フォグの追加</a></p>
  <p><a href="./2-4.html">2-4: テクスチャの追加</a></p>
  <p><a href="./2-5.html">2-5: 素体ジオメトリでパーティクル表現</a></p>
  <p><a href="./2-6.html">2-6: 大量のパーティクルを乱数で生成する</a></p>
  <p><a href="./2-7.html">2-7: ポイントスプライトとマテリアル設定</a></p>
  <p><a href="./2-8.html">2-8: ポストプロセスによるグリッチエフェクト</a></p>
  <p><a href="./2-9.html">2-9: コンポーザーに複数のパスを追加する</a></p>
  <p><a href="./2-10.html">2-10: コンポーザーに複数のパスを追加する ver2</a></p>
  <p><a href="./3-1.html">3-1: 地球と月を描く</a></p>
  <p><a href="./3-2.html">3-2: 月の座標をサインとコサインで動かす</a></p>
  <p><a href="./3-3.html">3-3: 月の座標をカーソル位置に応じて動かす</a></p>
  <p><a href="./3-4.html">3-4: ベクトルの単位化を利用して月を動かす</a></p>
  <p><a href="./3-5.html">3-5: ベクトルの内積と外積を使ってみる</a></p>
  <p><a href="./3-6.html">3-6: 月を追尾する人工衛星</a></p>
  <p><a href="./3-7.html">3-7: 月を追尾する人工衛星（改）</a></p>
  <p><a href="./3-8.html">3-8: 月を目指すロケット(クォータ二オン) </a></p>
`;

const ready = () => {
  const body = document.body;
  body.insertAdjacentHTML("beforeend", html);
};

window.addEventListener("DOMContentLoaded", () => {
  ready();
});
