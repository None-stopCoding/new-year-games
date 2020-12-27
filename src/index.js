import * as $ from 'jquery';
import SceneManager from './SceneManager';
import start from './scenes/start';
import past from './scenes/past';
import present from './scenes/present';
import future from './scenes/future';
import end from './scenes/end';
import './styles.styl';

SceneManager.register({ id: "preload", next: "start" });

let audio = new Audio("./audio/vzhuh.mp3");
audio.volume = 0.2;

function contentLoadedHandler() {
    SceneManager.start({initialScene: 'preload'});
    setTimeout(function() {
        SceneManager.next();
    }, 500);
}

function preloaderHandler() {
    // SceneManager.preload({ initialScene: 'start' });
}

$('[data-hide]').on('click', function($event) {
    var togglerElem = $event.target.attributes.getNamedItem('data-hide')?.value;

    $(togglerElem).fadeOut();
});

$('[data-vzhuh]').on('click', function() {
    audio.play();
});

$('[data-show]').on('click', function($event) {
    var togglerElem = $event.target.attributes.getNamedItem('data-show')?.value;

    $(togglerElem).fadeIn();
});

document.addEventListener('DOMContentLoaded', preloaderHandler);

window.addEventListener('load', contentLoadedHandler);
