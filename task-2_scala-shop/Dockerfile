FROM sbtscala/scala-sbt:eclipse-temurin-alpine-23.0.2_7_1.10.10_3.6.4 
ARG NGROK_TOKEN


RUN apk add wget curl
RUN apk add jq
RUN wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
RUN tar -xvzf ngrok-v3-stable-linux-amd64.tgz -C /usr/local/bin

WORKDIR /app
COPY . .

RUN ngrok authtoken $NGROK_TOKEN

CMD ./start.sh
