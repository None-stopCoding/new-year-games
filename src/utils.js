import * as $ from 'jquery';

export function getElementById(id) {
    return document.getElementById(id);
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function showMessage(message, config) {
    let type = (config || {}).type || 'error';
    let callback = (config || {}).callback;
    let container = $('#re-message__info');
    container.removeClass('re-hidden').addClass(type).html(message);

    setTimeout(function() {
        container.addClass('re-hidden').removeClass(type).html('');
        typeof callback === 'function' && callback();
    }, 1300);
}
