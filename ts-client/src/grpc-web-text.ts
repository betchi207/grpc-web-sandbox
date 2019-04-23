import * as grpcWeb from 'grpc-web';

import { EchoServiceClient } from '../../protoc-gen-grpc-web-text/echo_grpc_web_pb';
import { EchoRequest, EchoResponse } from '../../protoc-gen-grpc-web-text/echo_pb';
import { HealthClient } from '../../protoc-gen-grpc-web-text/health_grpc_web_pb';
import { HealthCheckRequest, HealthCheckResponse } from '../../protoc-gen-grpc-web-text/health_pb';
import { init, setResult } from './common';

export namespace GrpcWebText {
  export const echoRun = (endpoint: string, id: string) => {
    setResult(id, '', '');

    const req = new EchoRequest();
    req.setText('grpc-web mode=grpcwebtext')

    const client = new EchoServiceClient(endpoint, {}, {});
    client.echo(
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

  export const healthCheckRun = (endpoint: string, id: string) => {
    setResult(id, '', '');

    const req = new HealthCheckRequest();
    const client = new HealthClient(endpoint, {}, {});
    client.check(
      req,
      {},
      (err: grpcWeb.Error, res: HealthCheckResponse) => {
        if (err) {
          setResult(id, err.message, String(err.code));
        } else {
          let statusString = "";
          switch (res.getStatus()) {
            case 0:
              statusString = "UNKNOWN"
              break;
            case 1:
              statusString = "SERVING"
              break;
            case 2:
              statusString = "NOT_SERVING"
              break;
            default:
              break;
          }
          setResult(id, statusString, '');
        }
      }
    );
  }
}