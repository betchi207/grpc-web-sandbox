// package: echo
// file: echo.proto

import * as echo_pb from "./echo_pb";
import {grpc} from "grpc-web-client";

type EchoServiceEcho = {
  readonly methodName: string;
  readonly service: typeof EchoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof echo_pb.EchoRequest;
  readonly responseType: typeof echo_pb.EchoResponse;
};

export class EchoService {
  static readonly serviceName: string;
  static readonly Echo: EchoServiceEcho;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }
export type ServiceClientOptions = { transport: grpc.TransportConstructor; debug?: boolean }

interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}

export class EchoServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: ServiceClientOptions);
  echo(
    requestMessage: echo_pb.EchoRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: echo_pb.EchoResponse|null) => void
  ): void;
  echo(
    requestMessage: echo_pb.EchoRequest,
    callback: (error: ServiceError, responseMessage: echo_pb.EchoResponse|null) => void
  ): void;
}

