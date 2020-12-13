import sceneManager from '../SceneManager';
import { getElementById } from '../utils';

const id = 'start';
const next = 'past';
const initActionId = 'init';

const action = getElementById(initActionId);

sceneManager.register({ id, next });

action?.addEventListener('click', initHandler);

function initHandler() {
    sceneManager.next();
}
