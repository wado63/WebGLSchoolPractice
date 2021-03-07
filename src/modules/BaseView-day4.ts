export class BaseView {
  private canvas: HTMLCanvasElement;
  public renderingConttext: WebGLRenderingContext;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const renderingConttext = canvas.getContext("webgl");

    if (renderingConttext === null)
      throw new Error("the rendering conttext is not available");

    this.renderingConttext = renderingConttext;

    this.renderingConttext.viewport(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    // クリアする色を設定する（RGBA で 0.0 ～ 1.0 の範囲で指定する）
    this.renderingConttext.clearColor(0.3, 0.3, 0.3, 1.0);

    this.canvas.addEventListener(
      "mousemove",
      this.handleMouseMoove.bind(this),
      false
    );
  }

  /**
   * JavaScript の配列から Vertex Buffer Object を生成する
   */
  public createVertexBufferObject(vertexArray: number[]): WebGLBuffer {
    // バッファー作成 → データ挿入のためバインド → データ追加 → バインド解除 → return バッファー
    // 空のバッファオブジェクトを生成する
    const vertexBufferObject = this.renderingConttext.createBuffer();

    if (vertexBufferObject === null)
      throw new Error("the vertex buffer object is null");

    // バッファを this.renderingConttext.ARRAY_BUFFER としてバインドする
    // ↑操作する要素を指名する。操作する際にはこの作業は忘れずに。
    // ARRAY_BUFFER←頂点属性の配列ですよ
    this.renderingConttext.bindBuffer(
      this.renderingConttext.ARRAY_BUFFER,
      vertexBufferObject
    );
    // バインドしたバッファに Float32Array オブジェクトに変換した配列を設定する
    // 生成したバッファの中身に、データが流し込まれた状態になった！
    // ARRAY_BUFFER とかメモリの番地が入っている。
    this.renderingConttext.bufferData(
      this.renderingConttext.ARRAY_BUFFER,
      new Float32Array(vertexArray),
      this.renderingConttext.STATIC_DRAW
    );
    // 安全のために最後にバインドを解除してからバッファオブジェクトを返す
    this.renderingConttext.bindBuffer(
      this.renderingConttext.ARRAY_BUFFER,
      null
    );
    // 値を流し込んだバッファオブジェクトが返ってくる
    return vertexBufferObject;
  }

  /**
   * JavaScript の配列から Index Buffer Object を生成する
   */
  public createIndexBufferObject(indexArray: number[]): WebGLBuffer {
    // バッファー作成 → データ挿入のためバインド → データ追加 → バインド解除 → return バッファー
    // 空のバッファオブジェクトを生成する
    const indexBufferObject = this.renderingConttext.createBuffer();

    if (indexBufferObject === null)
      throw new Error("the index buffer object is null");

    // バッファを this.renderingConttext.ELEMENT_ARRAY_BUFFER としてバインドする
    // ↑操作する要素を指名する。操作する際にはこの作業は忘れずに。
    // ELEMENT_ARRAY_BUFFER インデックスの配列です
    this.renderingConttext.bindBuffer(
      this.renderingConttext.ELEMENT_ARRAY_BUFFER,
      indexBufferObject
    );
    // バインドしたバッファに Float32Array オブジェクトに変換した配列を設定する
    // 生成したバッファの中身に、データが流し込まれた状態になった！
    // ELEMENT_ARRAY_BUFFER とかメモリの番地が入っている。
    this.renderingConttext.bufferData(
      this.renderingConttext.ELEMENT_ARRAY_BUFFER,
      new Int16Array(indexArray),
      this.renderingConttext.STATIC_DRAW
    );
    // 安全のために最後にバインドを解除してからバッファオブジェクトを返す
    this.renderingConttext.bindBuffer(
      this.renderingConttext.ELEMENT_ARRAY_BUFFER,
      null
    );
    // 値を流し込んだバッファオブジェクトが返ってくる
    return indexBufferObject;
  }

  /**
   * ソースコードからシェーダオブジェクトを生成する
   */
  public createShaderObject(
    source: string,
    type: "VERTEX_SHADER" | "FRAGMENT_SHADER"
  ): WebGLShader {
    // 空のシェーダオブジェクトを生成する
    const shader = this.renderingConttext.createShader(
      this.renderingConttext[type]
    );

    if (!shader) throw new Error("the shader is null");

    // シェーダオブジェクトにソースコードを割り当てる
    this.renderingConttext.shaderSource(shader, source);
    // シェーダをコンパイルする
    this.renderingConttext.compileShader(shader);
    // コンパイル後のステータスを確認し問題なければシェーダオブジェクトを返す
    if (
      this.renderingConttext.getShaderParameter(
        shader,
        this.renderingConttext.COMPILE_STATUS
      )
    ) {
      return shader;
    } else {
      throw new Error("the shader is not available");
    }
  }

  /**
   * シェーダオブジェクトからプログラムオブジェクトを生成する
   */
  public createProgramObject(vs: WebGLShader, fs: WebGLShader): WebGLProgram {
    // 空のプログラムオブジェクトを生成する
    const program = this.renderingConttext.createProgram();

    if (!program) throw new Error("the program is null");

    // ２つのシェーダをアタッチ（関連付け）する
    this.renderingConttext.attachShader(program, vs);
    this.renderingConttext.attachShader(program, fs);

    // シェーダオブジェクトをリンクする
    this.renderingConttext.linkProgram(program);

    // リンクが完了するとシェーダオブジェクトは不要になるので削除する
    // JSのガベージコレクタでは解放されないデータが出て来る可能性があるのでしっかり削除するメソッドを呼び出して削除する。VBOとかも削除して良い（GPU側に値があるから）目立たない程度ならやらなくても行ける
    this.renderingConttext.deleteShader(vs);
    this.renderingConttext.deleteShader(fs);

    // リンク後のステータスを確認し問題なければプログラムオブジェクトを返す
    if (
      this.renderingConttext.getProgramParameter(
        program,
        this.renderingConttext.LINK_STATUS
      )
    ) {
      return program;
    } else {
      throw new Error("the program is not available");
    }
  }

  /**
   * 頂点属性情報を有効化しロケーションと紐付ける
   */
  public enableAttribute(
    vertexBufferObject: WebGLBuffer,
    attributeLocation: number,
    attributeStride: number
  ): void {
    // ArrayBufferに作成しておいた頂点バッファーを紐付ける
    this.renderingConttext.bindBuffer(
      this.renderingConttext.ARRAY_BUFFER,
      vertexBufferObject
    );
    // 頂点属性ロケーションの有効化を行う
    this.renderingConttext.enableVertexAttribArray(attributeLocation);
    // 対象のロケーションのストライドやデータ型を設定する
    //vex3（ストライドが3）に合わせている
    this.renderingConttext.vertexAttribPointer(
      attributeLocation,
      attributeStride,
      this.renderingConttext.FLOAT,
      false,
      0,
      0
    );

    this.renderingConttext.bindBuffer(
      this.renderingConttext.ARRAY_BUFFER,
      null
    );
  }

  /**
   * canvasをクリアする
   */
  resetCanvas(): void {
    // 実際にクリアする（gl.COLOR_BUFFER_BIT で色をクリアしろ、という指定になる）
    this.renderingConttext.clear(this.renderingConttext.COLOR_BUFFER_BIT);
  }

  /**
   * レンダリングを即座に実行します。
   */
  public render(): void {
    throw new Error("should override this function");
  }

  protected update(): void {
    requestAnimationFrame(this.update.bind(this));
    this.resetCanvas();
    this.render();
  }

  /**
   * レンダリングを開始します。
   */
  public startRendering(): void {
    this.update();
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
    const x = clientX / width;
    const y = clientY / height;
    this.onMouseMove(x, y);
  }

  /**
   * CanvasMouseMove時に実行される関数です。
   */
  public onMouseMove(x: number, y: number): void {
    console.log(x, y);
  }
}
