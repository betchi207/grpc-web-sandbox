import * as grpcWeb from 'grpc-web';
import { EchoRequest, EchoResponse } from '../../protoc-gen-grpc-web-text/echo_pb';
import { EchoServiceClient } from '../../protoc-gen-grpc-web-text/echo_grpc_web_pb';
import { setResult, scheme } from './common';

const run = (endpoint: string, id: string) => {
  setResult(id, '', '');

  const req = new EchoRequest();
  req.setText('grpc-web mode=grpcwebtext')

  const blockchainService = new EchoServiceClient(endpoint, {}, {});
  blockchainService.echo(
    req,
    {},
    (err: grpcWeb.Error, res: EchoResponse) => {
      if (err) {
        setResult(id, err.message, String(err.code));
      } else {
        setResult(id, res.getText(), '');
      }
    }
  );
}

const grpcWebInit = () => {
  const grpcWebId = 'grpc-web-text';
  const grpcWebTbody = document.getElementById(grpcWebId + '-tbody');
  if (grpcWebTbody) {
    let i = 1;
    grpcWebTbody.childNodes.forEach(tr => {
      tr.childNodes.forEach(td => {
        const e = (td as HTMLElement);
        if (e.className === 'case-no') {
          e.innerHTML = String(i);
          i++;
        }
        if (e.className === 'result') {
          e.id = grpcWebId + '-case' + i + '-result';
        }
        if (e.className === 'run') {
          const b  = e.getElementsByTagName('button').item(0);
          if (b) {
            const runId = grpcWebId + '-case' + i;
            b.addEventListener('click', () => {
              const endpoint = scheme === 'https:' ? b.getAttribute('data-url-https') : b.getAttribute('data-url');
              if (endpoint) {
                run(endpoint, runId);
              }
            });
          }
        }
      })
    });
  }
}
grpcWebInit();
