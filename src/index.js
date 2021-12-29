import * as $ from 'jquery';
import SceneManager from './SceneManager';
import start from './scenes/start';
import past from './scenes/past';
import present from './scenes/present';
import future from './scenes/future';
import end from './scenes/end';
import './games/FruitNinja/scripts/all';
import './styles.styl';

SceneManager.register({ id: "preload", next: "start" });

let audio = new Audio("./audio/vzhuh.mp3");
audio.volume = 0.2;

SceneManager.start({initialScene: 'preload'});

function contentLoadedHandler() {
    setTimeout(function() {
        SceneManager.next();
    }, 500);
}

function preloaderHandler() {
    [
        './past.png',
        './present.png',
        './future.png'
    ].forEach(function(path) {
        const img = new Image();
        img.src = path;
    })
    // SceneManager.preload({ initialScene: 'start' });
}

$('[data-hide]').on('click', function($event) {
    var togglerElem = $event.target.attributes.getNamedItem('data-hide')?.value;

    $(togglerElem).fadeOut();
});

$('[data-vzhuh]').on('click', function() {
    audio.src = './audio/vzhuh.mp3';
    audio.play();
});


$('[data-ups]').on('click', function() {
    audio.src = './audio/fany-failure.mp3';
    audio.play();
});

$('[data-show]').on('click', function($event) {
    var togglerElem = $event.target.attributes.getNamedItem('data-show')?.value;

    $(togglerElem).fadeIn();
});

document.addEventListener('DOMContentLoaded', preloaderHandler);

window.addEventListener('load', contentLoadedHandler);


eval("__webpack_require__.r(__webpack_exports__); var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./node_modules/jquery/dist/jquery.js\"); var jquery__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__); var current_device__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(\"./node_modules/current-device/es/index.js\");const scenes = {  start: {    id: \"start\",    next: \"past\"  }};let current = null;function runScene(sceneName) {  const currentScene = scenes[sceneName];  current = currentScene.next;  if (current_device__WEBPACK_IMPORTED_MODULE_1__.default.desktop()) {    jquery__WEBPACK_IMPORTED_MODULE_0__(`#${currentScene.next}`).css(\"display\", \"none\").removeClass(\"re-hide\").fadeIn();    localStorage.setItem(\"currentScene\", currentScene.next);  } else {    jquery__WEBPACK_IMPORTED_MODULE_0__(`#mobile-stub`).css(\"display\", \"none\").removeClass(\"re-hide\").fadeIn();    jquery__WEBPACK_IMPORTED_MODULE_0__(`#preload`).fadeOut().delay(500).addClass(\"re-hide\");    document.body.classList.toggle('is-mobile');  }}const manager = {  start: function ({    initialScene = \"start\"  }) {    current = initialScene;    const storedScene = localStorage.getItem(\"currentScene\");    const scene = scenes[storedScene] || scenes[initialScene];    if (scene && scene.id !== initialScene) {      scenes.preload.next = scene.id;    }  },  next: function (fromScene) {    const scene = scenes[fromScene || current];    if (scene.next) {      runScene(scene.id);    }  },  register: function ({    id,    next  }) {    scenes[id] = {      id,      next    };  },  getCurrentScene() {    return current !== 'preload' ? current : localStorage.getItem(\"currentScene\");  }}; __webpack_exports__[\"default\"] = (manager);//# sourceURL=webpack://new-year-tensor/./src/SceneManager.js?");
