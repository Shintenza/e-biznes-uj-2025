FROM ubuntu:24.04

RUN apt-get update
RUN apt-get install -y gradle kotlin
RUN apt-get install -y openjdk-8-jdk

WORKDIR /app
RUN gradle init --type java-application
COPY ./build.gradle .

RUN gradle build

ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

CMD java -jar build/libs/app.jar
