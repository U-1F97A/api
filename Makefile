GO_IMAGE:=golang:1.14.1-alpine3.11
NODE_IMAGE:=node:14.2.0-alpine3.11
G_CNAME:=api-go
N_CNAME:=glitch-cli

init:
	@docker pull ${GO_IMAGE} && \
	docker pull ${NODE_IMAGE} && \
	make node/init

go:
	@docker run -it --rm -v ${PWD}:/go -w /go --name ${G_CNAME} ${GO_IMAGE} sh

node:
	@docker run -it --rm -v ${PWD}:/node -w /node --name ${N_CNAME} ${NODE_IMAGE} sh

node/init:
	@docker run --rm -v ${PWD}:/node -w /node ${NODE_IMAGE} npm install && exit
