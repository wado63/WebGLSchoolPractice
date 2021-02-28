/**
 * 2日目の講義用の共通view
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

export class BasicView {
  /** シーンオブジェクトです。 */
  public scene: THREE.Scene;
  /** カメラオブジェクトです。(PerspectiveCamera のみ) */
  public camera: THREE.PerspectiveCamera;
  /** レンダラーオブジェクトです。(WebGL のみ) */
  public renderer: THREE.WebGLRenderer;
  /** HTML要素です。 */
  public containerElement: HTMLElement;
  /** requestId */
  private requestId = 0;
  /** isAnimate */
  private isAnimate = false;

  constructor(args = {}) {
    const defaultArgs = {
      // カメラに関するパラメータ
      camera: {
        fovy: 60, // Field of View 縦方向の視野角
        aspect: window.innerWidth / window.innerHeight, // 撮影する空間の縦横比
        near: 0.1, // カメラが映す範囲の前面
        far: 30.0, // カメラが映す範囲の後面
        x: 0.0,
        y: 2.0,
        z: 5,
        // カメラの注視点
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0), // OrbitControlsを使うと注視点を原点に設定してしまう
      },
      // レンダラに関するパラメータ  0xは16進数を示すリテラル
      renderer: {
        clearColor: "#dddddd", // 背景をクリアする色
        width: window.innerWidth, // レンダリングする領域の幅
        height: window.innerHeight, // レンダリングする領域の高さ
      },
    };

    const param = { ...defaultArgs, ...args };

    this.containerElement = document.createElement("div");
    document.body.appendChild(this.containerElement);

    this.scene = new THREE.Scene();

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(
      DIRECTIONAL_LIGHT_PARAM.color,
      DIRECTIONAL_LIGHT_PARAM.intensity
    );
    directionalLight.position.x = DIRECTIONAL_LIGHT_PARAM.x;
    directionalLight.position.y = DIRECTIONAL_LIGHT_PARAM.y;
    directionalLight.position.z = DIRECTIONAL_LIGHT_PARAM.z;
    this.scene.add(directionalLight);

    // 環境光
    const ambientLight = new THREE.AmbientLight(
      AMBIENT_LIGHT_PARAM.color,
      AMBIENT_LIGHT_PARAM.intensity
    );
    this.scene.add(ambientLight);

    // 補助線追加
    const axesHelper = new THREE.AxesHelper(5.0);
    this.scene.add(axesHelper);

    this.camera = new THREE.PerspectiveCamera(
      param.camera.fovy,
      param.camera.aspect,
      param.camera.near,
      param.camera.far
    );

    this.camera.position.set(param.camera.x, param.camera.y, param.camera.z);
    this.camera.lookAt(param.camera.lookAt);

    // アンチエイリアス設定有無
    const needAntialias = window.devicePixelRatio === 1.0;
    this.renderer = new THREE.WebGLRenderer({ antialias: needAntialias });

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(param.renderer.clearColor);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.setSize(param.renderer.width, param.renderer.height);
    this.containerElement.appendChild(this.renderer.domElement);

    // orbitControlの設定
    new OrbitControls(this.camera, this.renderer.domElement);

    window.addEventListener("resize", () => {
      this.handleResize();
    });
    window.addEventListener(
      "keydown",
      (event) => {
        const shouldStop = event.key === "Escape";
        if (shouldStop) {
          cancelAnimationFrame(this.requestId);
        }
        if (event.key === " ") {
          this.isAnimate = true;
        }
      },
      false
    );
    window.addEventListener(
      "keyup",
      (event) => {
        if (event.key === " ") {
          this.isAnimate = false;
        }
      },
      false
    );
    this.renderer.domElement.addEventListener(
      "click",
      (event: MouseEvent) => {
        const { clientX, clientY } = event;
        const {
          width,
          height,
        } = (event.currentTarget as HTMLCanvasElement).getBoundingClientRect();
        const x = (clientX / width) * 2 - 1;
        const y = (clientY / height) * 2 - 1;
        this.onClick(x, y);
      },
      false
    );
  }

  /**
   * レンダリングを開始します。
   */
  public startRendering(): void {
    this.update();
  }

  /**
   * レンダリングを即座に実行します。
   */
  public render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * 毎フレーム実行される関数です。
   */
  public onTick(): void {
    // to overlide
  }

  /**
   * スペース押下時の処理
   */
  public animate(): void {
    // to overlide
  }

  /**
   * CanvasClick時に実行される関数です。
   */
  public onClick(x: number, y: number): void {
    console.log(x, y);
  }

  /**
   * ウインドウリサイズ時のイベントハンドラーです。
   * @param event
   */
  protected handleResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /**
   * requestAnimationFrame で呼び出されるメソッドです。
   * @private
   */
  protected update(): void {
    this.requestId = requestAnimationFrame(this.update.bind(this));
    if (this.isAnimate) this.animate();
    this.onTick();
    this.render();
  }
}
