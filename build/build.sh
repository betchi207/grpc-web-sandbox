#!/usr/bin/env bash

onSignalInterrupt() {
  echo "Interrupted!"
  exit 1
}

trap onSignalInterrupt 2

echo "Build start!"

rm -f ./protoc-gen-go/echo/*
rm -f ./protoc-gen-go/health/*
rm -f ./protoc-gen-grpc-web/*_pb.js
rm -f ./protoc-gen-grpc-web/*_pb.d.ts
rm -f ./protoc-gen-grpc-web-text/*_pb.js
rm -f ./protoc-gen-grpc-web-text/*_pb.d.ts
rm -f ./protoc-gen-grpc-web-client/*_pb*.js
rm -f ./protoc-gen-grpc-web-client/*_pb*.d.ts

protoc \
  -I./proto/ \
  --go_out=plugins=grpc:./protoc-gen-go/echo \
  --js_out=import_style=commonjs,binary:./protoc-gen-grpc-web/ \
  --grpc-web_out=import_style=commonjs+dts,mode=grpcweb:./protoc-gen-grpc-web/ \
  --js_out=import_style=commonjs,binary:./protoc-gen-grpc-web-text/ \
  --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:./protoc-gen-grpc-web-text/ \
  --js_out=import_style=commonjs,binary:./protoc-gen-grpc-web-client/ \
  --ts_out="service=true:./protoc-gen-grpc-web-client/" \
  echo.proto
if [ $? -gt 0 ]; then
  exit 1
fi

protoc \
  -I./proto/ \
  --go_out=plugins=grpc:./protoc-gen-go/health \
  --js_out=import_style=commonjs,binary:./protoc-gen-grpc-web/ \
  --grpc-web_out=import_style=commonjs+dts,mode=grpcweb:./protoc-gen-grpc-web/ \
  --js_out=import_style=commonjs,binary:./protoc-gen-grpc-web-text/ \
  --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:./protoc-gen-grpc-web-text/ \
  --js_out=import_style=commonjs,binary:./protoc-gen-grpc-web-client/ \
  --ts_out="service=true:./protoc-gen-grpc-web-client/" \
  health.proto
if [ $? -gt 0 ]; then
  exit 1
fi

echo "Build finish!"