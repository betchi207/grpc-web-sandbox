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
	docker build -t betchi/go-server -f ./Dockerfile-GoServer .

.PHONY: bundle
bundle:
	cd ts-client; \
	parcel build index.html

