// package: grpc.health.v1
// file: health.proto

import * as health_pb from "./health_pb";
import {grpc} from "@improbable-eng/grpc-web";

type HealthCheck = {
  readonly methodName: string;
  readonly service: typeof Health;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof health_pb.HealthCheckRequest;
  readonly responseType: typeof health_pb.HealthCheckResponse;
};

export class Health {
  static readonly serviceName: string;
  static readonly Check: HealthCheck;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: () => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: () => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class HealthClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  check(
    requestMessage: health_pb.HealthCheckRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: health_pb.HealthCheckResponse|null) => void
  ): UnaryResponse;
  check(
    requestMessage: health_pb.HealthCheckRequest,
    callback: (error: ServiceError|null, responseMessage: health_pb.HealthCheckResponse|null) => void
  ): UnaryResponse;
}

