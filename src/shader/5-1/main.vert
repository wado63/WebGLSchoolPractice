attribute vec3 position;
attribute vec4 color;

uniform mat4 mvpMatrix; // mvp 行列

varying vec4 vColor;

void main(){
    vColor = color;
    // mvp 行列と頂点座標を掛け合わせてから出力
    // ※このとき、左項と右項の順序に気をつける！（数学的には列優先）
    // ※また今は深く考えなくてもいいのですが position の隣は基本的に 1.0 です
    // 影響を与えたい方を後ろに書く
    gl_Position = mvpMatrix * vec4(position, 1.0);
}

