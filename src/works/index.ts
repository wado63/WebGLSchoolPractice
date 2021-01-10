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
`;

const ready = () => {
  const body = document.body;
  body.insertAdjacentHTML("beforeend", html);
};

window.addEventListener("DOMContentLoaded", () => {
  ready();
});
