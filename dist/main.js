/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nwindow.addEventListener(\"DOMContentLoaded\", function () {\n    // レンダラーを作成\n    var renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer();\n    // レンダラーのサイズを設定\n    renderer.setSize(800, 600);\n    // canvasをbodyに追加\n    document.body.appendChild(renderer.domElement);\n    // シーンを作成\n    var scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\n    // カメラを作成\n    var camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45, 800 / 600, 1, 10000);\n    camera.position.set(0, 0, 1000);\n    // 箱を作成\n    var geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(250, 250, 250);\n    var material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({ color: 0xff0000 });\n    var box = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);\n    box.position.z = -5;\n    scene.add(box);\n    // 平行光源を生成\n    var light = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(0xffffff);\n    light.position.set(1, 1, 1);\n    scene.add(light);\n    var tick = function () {\n        requestAnimationFrame(tick);\n        box.rotation.x += 0.05;\n        box.rotation.y += 0.05;\n        // 描画\n        renderer.render(scene, camera);\n    };\n    tick();\n    console.log(\"Hello Three.js\");\n});\n\n\n//# sourceURL=webpack://WebGLSchoolPractice/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;