INAME:=node:14.2.0-alpine3.11
CNAME:=api-node

init:
	@docker pull ${GO_IMAGE}

node:
	@docker run -it --rm -v ${PWD}:/node -w /node --name ${CNAME} -p 8080:3000 ${INAME} sh
