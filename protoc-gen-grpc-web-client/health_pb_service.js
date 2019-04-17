// package: grpc.health.v1
// file: health.proto

var health_pb = require("./health_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Health = (function () {
  function Health() {}
  Health.serviceName = "grpc.health.v1.Health";
  return Health;
}());

Health.Check = {
  methodName: "Check",
  service: Health,
  requestStream: false,
  responseStream: false,
  requestType: health_pb.HealthCheckRequest,
  responseType: health_pb.HealthCheckResponse
};

exports.Health = Health;

function HealthClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

HealthClient.prototype.check = function check(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Health.Check, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.HealthClient = HealthClient;

