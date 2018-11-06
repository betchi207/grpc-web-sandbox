// package: echo
// file: echo.proto

var echo_pb = require("./echo_pb");
var grpc = require("grpc-web-client").grpc;

var EchoService = (function () {
  function EchoService() {}
  EchoService.serviceName = "echo.EchoService";
  return EchoService;
}());

EchoService.Echo = {
  methodName: "Echo",
  service: EchoService,
  requestStream: false,
  responseStream: false,
  requestType: echo_pb.EchoRequest,
  responseType: echo_pb.EchoResponse
};

exports.EchoService = EchoService;

function EchoServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

EchoServiceClient.prototype.echo = function echo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(EchoService.Echo, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

exports.EchoServiceClient = EchoServiceClient;

