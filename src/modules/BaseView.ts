import * as THREE from "three";

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

  constructor(args = {}) {
    const defaultArgs = {
      // カメラに関するパラメータ
      camera: {
        fovy: 60, // Field of View 縦方向の視野角
        aspect: window.innerWidth / window.innerHeight, // 撮影する空間の縦横比
        near: 0.1, // カメラが映す範囲の前面
        far: 10.0, // カメラが映す範囲の後面
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
    this.camera = new THREE.PerspectiveCamera(
      param.camera.fovy,
      param.camera.aspect,
      param.camera.near,
      param.camera.far
    );

    this.camera.position.set(param.camera.x, param.camera.y, param.camera.z);
    this.camera.lookAt(param.camera.lookAt);

    // // アンチエイリアス設定有無
    const needAntialias = window.devicePixelRatio === 1.0;
    this.renderer = new THREE.WebGLRenderer({ antialias: needAntialias });

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(param.renderer.clearColor);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.setSize(param.renderer.width, param.renderer.height);
    this.containerElement.appendChild(this.renderer.domElement);

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

    this.onTick();
    this.render();
  }
}
