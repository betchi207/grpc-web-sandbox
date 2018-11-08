import * as grpcWeb from 'grpc-web';
import { EchoRequest, EchoResponse } from '../../protoc-gen-grpc-web-text/echo_pb';
import { EchoServiceClient } from '../../protoc-gen-grpc-web-text/echo_grpc_web_pb';
import { setResult, init } from './common';

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

init('grpc-web-text', run);
