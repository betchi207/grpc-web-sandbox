.PHONY: protoc
protoc:
	./genproto.sh;

.PHONY: run-kong-db
run-kong-db:
	docker run --rm --name kong-database \
		--network grpc-web-test \
		-p 9042:9042 \
		-v  `pwd`/kong-database:/var/lib/cassandra \
		cassandra:3.11.3;

.PHONY: build-go-server
build-go-server:
	docker build -t betchi/go-server -f ./build/dockerfiles/Dockerfile-GoServer .

.PHONY: build-protobuf-builder
build-protobuf-builder:
	docker build -t betchi/protobuf-builder -f ./build/dockerfiles/Dockerfile-ProtobufBuilder .

.PHONY: build-protobuf
build-protobuf:
	docker run -v ${PWD}:/go/src/github.com/betchi/grpc-web-sandbox betchi/protobuf-builder

.PHONY: bundle
bundle:
	cd ts-client; \
	parcel build index.html

.PHONY: clean
clean:
	rm -rf protoc-gen-go/*;
	rm -rf protoc-gen-grpc-web/*.js;
	rm -rf protoc-gen-grpc-web/*.ts;
	rm -rf protoc-gen-grpc-web-text/*.js;
	rm -rf protoc-gen-grpc-web-text/*.ts;
	rm -rf protoc-gen-grpc-web-client/*.js;
	rm -rf protoc-gen-grpc-web-client/*.ts;
	git checkout protoc-gen-go protoc-gen-grpc-web protoc-gen-grpc-web-text protoc-gen-grpc-web-client;