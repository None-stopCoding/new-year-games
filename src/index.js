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
    ].forEach((path) => {
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
    audio.src = './audio/ups.mp3';
    audio.play();
});

$('[data-show]').on('click', function($event) {
    var togglerElem = $event.target.attributes.getNamedItem('data-show')?.value;

    $(togglerElem).fadeIn();
});

document.addEventListener('DOMContentLoaded', preloaderHandler);

window.addEventListener('load', contentLoadedHandler);
