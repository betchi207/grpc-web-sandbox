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

export const init = (id: string, run: (endpoint: string, id: string) => void) => {
    const grpcWebTbody = document.getElementById(id + '-tbody');
    if (grpcWebTbody) {
      for (let i = 0; i < grpcWebTbody.childNodes.length; i++) {
        const tr = grpcWebTbody.childNodes.item(i);
        for (let j = 0; j < tr.childNodes.length; j++) {
          const e = tr.childNodes.item(j) as HTMLElement;
          if (e.className === 'case-no') {
            e.innerHTML = String(i);
            i++;
          }
          if (e.className === 'result') {
            e.id = id + '-case' + i + '-result';
          }
          if (e.className === 'run') {
            const b  = e.getElementsByTagName('button').item(0);
            if (b) {
              const runId = id + '-case' + i;
              b.addEventListener('click', () => {
                let endpoint = scheme === 'https:' ? b.getAttribute('data-url-https') : b.getAttribute('data-url');
                if (endpoint) {
                  endpoint = endpoint.replace(/localhost/i, location.hostname);
                  if (endpoint) {
                    run(endpoint, runId);
                  }
                }
              });
            }
          }
        }
      }
    }
  }