import { grpc } from 'grpc-web-client';

import { EchoRequest, EchoResponse } from '../../protoc-gen-grpc-web-client/echo_pb';
import { EchoService } from '../../protoc-gen-grpc-web-client/echo_pb_service';
import {
    HealthCheckRequest, HealthCheckResponse
} from '../../protoc-gen-grpc-web-client/health_pb';
import { Health } from '../../protoc-gen-grpc-web-client/health_pb_service';
import { setResult } from './common';

export namespace GrpcWebClient {
  export const echoRun = (endpoint: string, id: string) => {
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

  export const healthCheckRun = (endpoint: string, id: string) => {
    setResult(id, '', '');

    const req = new HealthCheckRequest()
    grpc.unary(
      Health.Check,
      {
        request: req,
        host: endpoint,
        onEnd: res => {
          const { status, statusMessage, message } = res;
          if (status === grpc.Code.OK && message) {
            const obj = message.toObject() as HealthCheckResponse.AsObject;
            let statusString = "";
            switch (obj.status) {
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
          } else {
            setResult(id, statusMessage, String(status));
          }
        }
      }
    );
  }
}