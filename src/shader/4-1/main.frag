precision mediump float;

void main(){
    // gl_FragColor が、最終的に画面に出力される色（vec4）
    // 色の範囲は0~1
    // vec4(1.0) === vec4(1.0, 1.0, 1.0, 1.0,)
    gl_FragColor = vec4(1.0, 0.7, 1.0, 1.0);
}
