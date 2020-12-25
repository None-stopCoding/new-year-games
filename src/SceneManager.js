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

const manager = {
    start: ({ initialScene = 'start' }) => {
        current = initialScene;
        const storedScene = localStorage.getItem('currentScene');
        const scene = scenes[storedScene] || scenes[initialScene];

        if (scene) {
            $(`#${scene.id}`)
                .removeClass('re-hidden')
                .fadeIn();
        }
    },
    next: (fromScene) => {
        const scene = scenes[fromScene || current];

        if (scene.next) {
            runScene(scene.id);
        }

        localStorage.setItem('currentScene', scene.id);
    },

    register: ({id, next}) => {
        scenes[id] = {
            id,
            next
        };
    }
}

export default manager;
