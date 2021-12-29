import * as $ from 'jquery';
import sceneManager from '../SceneManager';
import { getElementById } from '../utils'
import init from '../games/Matches/index';

let answers = {
    'first': { 'серпантин': false },
    'second': { 'карнавал': false },
    'third': { 'снегурочка': false }
}

sceneManager.register({ id: 'present', next: 'future' });

getElementById('present_trigger').addEventListener('click', initHandler);
getElementById('present_run-next').addEventListener('click', runNextHandler);

document.querySelectorAll('.re-game__Riddles-input').forEach(function(component) {
    component.addEventListener('mousedown', function(event) {
        event.target.focus();
        console.log(event.target);
    })
})

function isGameEndedCallback() {
    setTimeout(function() {
        $('#present_finish').removeClass('re-hidden');
        $('#present_game-field').addClass('re-hidden').fadeOut().delay(300);
    }, 700);
}

function initHandler() {
    // init({ stateChangedCallback: isGameEndedCallback });
    $('#present_preview').fadeOut().delay(1000).addClass('re-hidden');
    // isGameEndedCallback();
    $('#present_game-field').removeClass('re-hidden').fadeIn();

    ['first', 'second', 'third'].forEach(function(key) {
        getElementById('riddles-' + key).addEventListener('click', function() {
            checkValue(key);
        });
    });
}

function checkValue(riddle) {
    let input = $('#riddles-' + riddle + '-input');
    let answer = Object.keys(answers[riddle])[0];

    if (input.val() === answer) {
        input.removeClass('error-border');
        input.addClass('success-border');
        answers[riddle][answer] = true;
    } else {
        input.removeClass('success-border');
        input.addClass('error-border');
    }

    if (Object.keys(answers).every(function(key) {
        return Object.values(answers[key])[0];
    })) {
        isGameEndedCallback();
    }
}

function runNextHandler() {
    sceneManager.next('present');
}
