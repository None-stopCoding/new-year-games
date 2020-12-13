import * as $ from 'jquery';

const scenes = {};
let current = null;

function runScene(sceneName) {
    const currentScene = scenes[sceneName];
    current = currentScene.next;

    $(`#${currentScene.next}`)
        .removeClass('re-hidden')
        .fadeIn();

    $(`#${currentScene.id}`)
        .fadeOut();
}

export default {
    start: ({ initialScene = 'start' }) => {
        current = initialScene;
    },
    next: (fromScene) => {
        const scene = scenes[fromScene || current];

        if (scene.next) {
            runScene(scene.id);
        }
    },
    register: ({id, next}) => {
        scenes[id] = {
            id,
            next
        };
    }
}
