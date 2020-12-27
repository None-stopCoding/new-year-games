import * as $ from 'jquery';
import SceneManager from './SceneManager';
import start from './scenes/start';
import past from './scenes/past';
import present from './scenes/present';
import future from './scenes/future';
import end from './scenes/end';
import './styles.styl';

SceneManager.register({ id: "preload", next: "start" });

function contentLoadedHandler() {
    SceneManager.start({initialScene: 'preload'})
    SceneManager.next();
}

function preloaderHandler() {
    // SceneManager.preload({ initialScene: 'start' });
}

$('[data-hide]').on('click', function($event) {
    var togglerElem = $event.target.attributes.getNamedItem('data-hide')?.value;

    $(togglerElem).fadeOut();
});

$('[data-show]').on('click', function($event) {
    var togglerElem = $event.target.attributes.getNamedItem('data-show')?.value;

    $(togglerElem).fadeIn();
});

document.addEventListener('DOMContentLoaded', preloaderHandler);

window.addEventListener('load', contentLoadedHandler);
