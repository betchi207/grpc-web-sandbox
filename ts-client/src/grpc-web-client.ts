import { grpc } from "grpc-web-client";
import { EchoRequest, EchoResponse } from '../../protoc-gen-grpc-web-client/echo_pb'
import { EchoService } from '../../protoc-gen-grpc-web-client/echo_pb_service'
import { setResult, scheme } from './common';

const run = (endpoint: string, id: string) => {
  setResult(id, '', '');

  const req = new EchoRequest()
  req.setText('grpc-web-client')
  grpc.unary(
    EchoService.Echo,
    {
      request: req,
      host: endpoint,
      onEnd: res => {
        const { status, statusMessage, message } = res;
        if (status === grpc.Code.OK && message) {
          const obj = message.toObject() as EchoResponse.AsObject;
          setResult(id, obj.text, '');
        } else {
          setResult(id, statusMessage, String(status));
        }
      }
    }
  );
}

const grpcWebClientInit = () => {
  const grpcWebClientId = 'grpc-web-client';
  const grpcWebClientTbody = document.getElementById(grpcWebClientId + '-tbody');
  if (grpcWebClientTbody) {
    let i = 1;
    grpcWebClientTbody.childNodes.forEach(tr => {
      tr.childNodes.forEach(td => {
        const e = (td as HTMLElement);
        if (e.className === 'case-no') {
          e.innerHTML = String(i);
          i++;
        }
        if (e.className === 'result') {
          e.id = grpcWebClientId + '-case' + i + '-result';
        }
        if (e.className === 'run') {
          const b  = e.getElementsByTagName('button').item(0);
          if (b) {
            const runId = grpcWebClientId + '-case' + i;
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
grpcWebClientInit();
