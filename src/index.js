import SceneManager from './SceneManager';
import start from './scenes/start';
import past from './scenes/past';
import present from './scenes/present';
import future from './scenes/future';
import end from './scenes/end';
import './styles.styl';

function contentLoadedHandler() {
    SceneManager.start({ initialScene: 'start' });
}

document.addEventListener('DOMContentLoaded', contentLoadedHandler);
