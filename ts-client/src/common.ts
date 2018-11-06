export const scheme = document.location!.protocol;

export const setResult = (id: string, message: string, errCode: string,) => {
    const dom = document.getElementById(id + '-result');
    if (dom) {
        dom.innerHTML = '';
        const span = document.createElement('span');
        let innnerHTML = '';
        if (errCode !== '') {
            span.className = 'uk-text-danger';
            innnerHTML = '[code]' + errCode + '\n[message]' + message;
        } else {
            span.className = 'uk-text-primary';
            innnerHTML = message;
        }
        span.innerHTML = innnerHTML;
        dom.appendChild(span);
    }
}
