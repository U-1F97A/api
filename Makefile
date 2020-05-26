GO_IMAGE:=golang:1.14.1-alpine3.11
G_CNAME:=api-go

init:
	docker pull ${GO_IMAGE}

go:
	docker run -it --rm -v ${PWD}:/go -w /go --name ${G_CNAME} ${GO_IMAGE} sh
