import * as grpcWeb from 'grpc-web';
import {
  EchoRequest,
  EchoResponse} from './echo_pb';

export class EchoServiceClient {
  constructor (hostname: string,
               credentials: {},
               options: { [s: string]: {}; });

  echo(
    request: EchoRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: EchoResponse) => void
  ): grpcWeb.ClientReadableStream;

}

