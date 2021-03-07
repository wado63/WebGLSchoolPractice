attribute vec3 position;
attribute vec4 color;

uniform vec2 mouse; // マウスカーソルの位置を受け取る uniform 変数 @@@

varying vec4 vColor;

void main(){
    // varying 変数は、頂点カラーにマウスの影響を与えてから送る
    vColor = color * vec4(mouse, 1.0, 1.0);
    /*
    vColor = vec4(
        color.r * mouse.x,
        color.g * mouse.y,
        1.0,
        1.0,
    )
    */
    // 各頂点の座標にmouse座標を足すと動かすことも出来る
    gl_Position = vec4(position, 1.0);
}

