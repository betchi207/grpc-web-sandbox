import { grpc } from "grpc-web-client";
import { EchoRequest, EchoResponse } from '../../protoc-gen-grpc-web-client/echo_pb'
import { EchoService } from '../../protoc-gen-grpc-web-client/echo_pb_service'
import { setResult, init } from './common';

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

init('grpc-web-client', run);
