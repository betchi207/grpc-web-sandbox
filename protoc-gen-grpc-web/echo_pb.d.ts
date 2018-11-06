export class EchoRequest {
  constructor ();
  getText(): string;
  setText(a: string): void;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => EchoRequest;
}

export class EchoResponse {
  constructor ();
  getText(): string;
  setText(a: string): void;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => EchoResponse;
}

