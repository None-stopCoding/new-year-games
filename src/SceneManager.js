import * as $ from "jquery";

const scenes = {
    start: {
        id: "start",
        next: "past",
    },
};
let current = null;

function runScene(sceneName) {
    const currentScene = scenes[sceneName];
    current = currentScene.next;

    $(`#${currentScene.next}`)
        .css("display", "none")
        .removeClass("re-hide")
        .fadeIn();

    $(`#${currentScene.id}`).fadeOut();

    localStorage.setItem("currentScene", currentScene.next);
}

const manager = {
    start: ({ initialScene = "start" }) => {
        current = initialScene;

        const storedScene = localStorage.getItem("currentScene");
        const scene = scenes[storedScene] || scenes[initialScene];

        if (scene && scene.id !== initialScene) {
            scenes.preload.next = scene.id;
        }
    },
    next: (fromScene) => {
        const scene = scenes[fromScene || current];

        if (scene.next) {
            runScene(scene.id);
        }
    },

    register: ({ id, next }) => {
        scenes[id] = {
            id,
            next,
        };
    },
};

export default manager;
