export class HealthCheckRequest {
  constructor ();
  getService(): string;
  setService(a: string): void;
  toObject(): HealthCheckRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => HealthCheckRequest;
}

export namespace HealthCheckRequest {
  export type AsObject = {
    Service: string;
  }
}

export class HealthCheckResponse {
  constructor ();
  getStatus(): HealthCheckResponse.ServingStatus;
  setStatus(a: HealthCheckResponse.ServingStatus): void;
  toObject(): HealthCheckResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => HealthCheckResponse;
}

export namespace HealthCheckResponse {
  export type AsObject = {
    Status: HealthCheckResponse.ServingStatus;
  }

  export enum ServingStatus { 
    UNKNOWN = 0,
    SERVING = 1,
    NOT_SERVING = 2,
  }
}

