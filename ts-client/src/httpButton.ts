import { scheme } from './common';

const initHttpButton = () => {
    const http11 = document.getElementById('http11');
    const http2 = document.getElementById('http2');

    if (!http11 || !http2) {
        return;
    }

    const activeClassName = 'uk-button-secondary';
    const nonActiveClassName = 'uk-button-default';
    if (scheme === 'http:') {
        http11.classList.add(activeClassName);
        http2.classList.remove(activeClassName);
        http2.classList.add(nonActiveClassName);

        http11.parentElement.setAttribute('href', '#');
        http2.parentElement.setAttribute('href', 'https://localhost:8083');
    } else {
        http11.classList.remove(activeClassName);
        http11.classList.add(nonActiveClassName);
        http2.classList.add(activeClassName);

        http11.parentElement.setAttribute('href', 'http://localhost:8081');
        http2.parentElement.setAttribute('href', '#');
    }
}
initHttpButton();