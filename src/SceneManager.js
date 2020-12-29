import * as $ from "jquery";
import deviceDetect from 'current-device';

const scenes = {
    start: {
        id: "start",
        next: "past",
    },
};
let current = null;

function mobileStub() {
    $(`#mobile-stub`)
            .css("display", "none")
            .removeClass("re-hide")
            .fadeIn();

        $(`#preload`)
            .fadeOut()
            .delay(500)
            .addClass("re-hide");

        document.body.classList.add('is-mobile');
}

function runScene(sceneName) {
    const currentScene = scenes[sceneName];
    current = currentScene.next;

    if (deviceDetect.desktop()) {
        $(`#${currentScene.next}`)
            .css("display", "none")
            .removeClass("re-hide")
            .fadeIn();

        $(`#${currentScene.id}`).fadeOut();

        localStorage.setItem("currentScene", currentScene.next);
    } else {
        mobileStub();
    }
}

const manager = {
    start: function({ initialScene = "start" }) {
        current = initialScene;

        const storedScene = localStorage.getItem("currentScene");
        const scene = scenes[storedScene] || scenes[initialScene];

        if (scene && scene.id !== initialScene) {
            scenes.preload.next = scene.id;
        }
        if (!deviceDetect.desktop()) {
            mobileStub();
        }
    },
    next: function(fromScene) {
        const scene = scenes[fromScene || current];

        if (scene.next) {
            runScene(scene.id);
        }
    },

    register: function({ id, next }) {
        scenes[id] = {
            id,
            next,
        };
    },

    getCurrentScene() {
        return current !== 'preload' ? current : localStorage.getItem("currentScene");
    }
};

export default manager;
