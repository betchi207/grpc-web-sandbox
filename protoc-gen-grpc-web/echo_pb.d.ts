export class EchoRequest {
  constructor ();
  getText(): string;
  setText(a: string): void;
  toObject(): EchoRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => EchoRequest;
}

export namespace EchoRequest {
  export type AsObject = {
    Text: string;
  }
}

export class EchoResponse {
  constructor ();
  getText(): string;
  setText(a: string): void;
  toObject(): EchoResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => EchoResponse;
}

export namespace EchoResponse {
  export type AsObject = {
    Text: string;
  }
}

