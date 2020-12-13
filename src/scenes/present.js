import * as $ from 'jquery';
import sceneManager from '../SceneManager';
import { getElementById } from '../utils'
import init from '../games/Matches/index';

sceneManager.register({ id: 'present', next: 'future' });

getElementById('present_trigger').addEventListener('click', initHandler);

getElementById('present_run-next')
    .addEventListener('click', runNextHandler);

function isGameEndedCallback() {
    $('#present_finish').removeClass('re-hidden');
    $('#present_game-field').addClass('re-hidden');
}

function initHandler() {
    init({ stateChangedCallback: isGameEndedCallback });
    $('#present_preview').fadeOut().delay(1000).addClass('re-hidden');
    $('#present_game-field').removeClass('re-hidden').fadeIn();
}

function runNextHandler() {
    sceneManager.next('present');
}
