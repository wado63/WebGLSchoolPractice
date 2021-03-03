/**
 * 3日目の講義用の共通view
 */
import {
  AmbientLight,
  AxesHelper,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class BasicView {
  protected fov = 60;
  protected ratio = window.innerWidth / window.innerHeight;
  protected near = 0.1;
  protected far = 30.0;
  protected cameraPositionX = 0.0;
  protected cameraPositionY = 2.0;
  protected cameraPositionZ = 5.0;
  protected cameraLookAtX = 0.0;
  protected cameraLookAtY = 0.0;
  protected cameraLookAtZ = 0.0;
  protected clearColor = 0xdddddd;

  /** シーンオブジェクトです。 */
  public scene: Scene = new Scene();
  /** カメラオブジェクトです。(PerspectiveCamera のみ) */
  public camera: PerspectiveCamera = (() => {
    const camera = new PerspectiveCamera(
      this.fov,
      this.ratio,
      this.near,
      this.far
    );
    camera.position.set(
      this.cameraPositionX,
      this.cameraPositionY,
      this.cameraPositionZ
    );
    camera.lookAt(this.cameraLookAtX, this.cameraLookAtY, this.cameraLookAtZ);
    return camera;
  })();
  /** レンダラーオブジェクトです。(WebGL のみ) */
  public renderer: WebGLRenderer = (() => {
    const renderer = new WebGLRenderer({
      antialias: window.devicePixelRatio === 1.0,
    });
    renderer.setClearColor(this.clearColor);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
  })();
  /** コンポーザーオブジェクト */
  public composer: EffectComposer = (() => {
    const composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    composer.addPass(renderPass);
    return composer;
  })();
  /** HTML要素です。 */
  public containerElement: HTMLElement = document.createElement("div");
  /** requestId */
  private requestId = 0;
  /** isAnimate */
  private isAnimate = false;

  constructor() {
    document.body.appendChild(this.containerElement);

    // 平行光源
    const directionalLight = new DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1.0, 1.0, 1.0);
    this.scene.add(directionalLight);

    // 環境光
    const ambientLight = new AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    // 補助線追加
    const axesHelper = new AxesHelper(5.0);
    this.scene.add(axesHelper);

    this.containerElement.appendChild(this.renderer.domElement);

    // orbitControlの設定
    new OrbitControls(this.camera, this.renderer.domElement);

    window.addEventListener("resize", this.handleResize.bind(this), false);
    window.addEventListener("keydown", this.handleKeyDown.bind(this), false);
    window.addEventListener("keyup", this.handleKeyUp.bind(this), false);
    this.renderer.domElement.addEventListener(
      "click",
      this.handleClickCanvas.bind(this),
      false
    );
    this.renderer.domElement.addEventListener(
      "mousemove",
      this.handleMouseMoove.bind(this),
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
    this.composer.render();
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
   * CanvasMouseMove時に実行される関数です。
   */
  public onMouseMove(x: number, y: number): void {
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
   * キー操作時のイベントハンドラーです。
   * @param event
   */
  protected handleKeyDown(event: KeyboardEvent): void {
    const shouldStop = event.key === "Escape";
    if (shouldStop) {
      cancelAnimationFrame(this.requestId);
    }
    if (event.key === " ") {
      this.isAnimate = true;
    }
  }

  /**
   * キー操作時のイベントハンドラーです。
   * @param event
   */
  protected handleKeyUp(event: KeyboardEvent): void {
    if (event.key === " ") {
      this.isAnimate = false;
    }
  }

  /**
   * Canvas押下時のイベントハンドラーです。
   * @param event
   */
  protected handleClickCanvas(event: MouseEvent): void {
    const { clientX, clientY } = event;
    const {
      width,
      height,
    } = (event.currentTarget as HTMLCanvasElement).getBoundingClientRect();
    const x = (clientX / width) * 2 - 1;
    const y = -((clientY / height) * 2 - 1);
    this.onClick(x, y);
  }

  /**
   * CanvasMouseMoveのイベントハンドラーです。
   * @param event
   */
  protected handleMouseMoove(event: MouseEvent): void {
    const { clientX, clientY } = event;
    const {
      width,
      height,
    } = (event.currentTarget as HTMLCanvasElement).getBoundingClientRect();
    const x = (clientX / width) * 2 - 1;
    const y = (clientY / height) * 2 - 1;
    this.onMouseMove(x, y);
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
