// attribute は、頂点属性であることを示す修飾子
attribute vec3 position;

void main(){
    // gl_Position は頂点がどのように描かれるかを決める座標の出力（vec4）
    // gl_ この接頭辞がついているのはビルドイン変数
    gl_Position = vec4(position, 1.0);
}
