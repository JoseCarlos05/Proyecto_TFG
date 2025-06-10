FROM amazoncorretto:23-alpine-jdk

WORKDIR /app

COPY .mvn/ .mvn/
COPY mvnw mvnw.cmd pom.xml ./

RUN chmod +x mvnw

RUN ./mvnw dependency:resolve dependency:go-offline

COPY src/ src/

RUN ./mvnw clean package -DskipTests