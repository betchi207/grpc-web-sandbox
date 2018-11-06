package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"io/ioutil"
	"log"
	"net"
	"os"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/reflection"

	pb "github.com/betchi/grpc-web-test/protoc-gen-go"
)

type echoServer struct{}

func (s *echoServer) Echo(ctx context.Context, msg *pb.EchoRequest) (*pb.EchoResponse, error) {
	return &pb.EchoResponse{
		Text: fmt.Sprintf("Hello from %s", msg.Text),
	}, nil
}

func main() {
	crtPath := os.Getenv("CRT_PATH")
	keyPath := os.Getenv("KEY_PATH")
	portTLS := os.Getenv("PORT_TLS")

	go func() {
		// tls server
		lisTLS, err := net.Listen("tcp", portTLS)
		if err != nil {
			log.Fatalf("failed to listen: %s", err.Error())
		}

		tlsOpt := createTLSOption(crtPath, keyPath)
		srvTLS := grpc.NewServer(tlsOpt)
		defer srvTLS.Stop()

		pb.RegisterEchoServiceServer(srvTLS, &echoServer{})
		reflection.Register(srvTLS)
		log.Printf("listening to server at port %v (with tls)\n", portTLS)
		log.Fatal(srvTLS.Serve(lisTLS))
	}()

	port := os.Getenv("PORT")
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %s", err.Error())
	}

	srv := grpc.NewServer()
	defer srv.Stop()

	pb.RegisterEchoServiceServer(srv, &echoServer{})
	reflection.Register(srv)
	log.Printf("listening to server at port %v (insecure)\n", port)
	log.Fatal(srv.Serve(lis))

}

func createTLSOption(crtPath, keyPath string) grpc.ServerOption {
	crtBuf, _ := ioutil.ReadFile(crtPath)
	keyBuf, _ := ioutil.ReadFile(keyPath)

	cert, err := tls.X509KeyPair(crtBuf, keyBuf)
	if err != nil {
		log.Fatalf("failed to parse certificate: %v", err)
	}

	creds := credentials.NewServerTLSFromCert(&cert)
	return grpc.Creds(creds)
}
