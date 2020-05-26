GO_IMAGE:=golang:1.14.1-alpine3.11
G_CNAME:=api-go

init:
	@docker pull ${GO_IMAGE}

go:
	@docker run -it --rm -v ${PWD}:/api -w /api --name ${G_CNAME} -p 8080:3000 ${GO_IMAGE} sh

go/build:
	@go fmt && \
	go build server.go
