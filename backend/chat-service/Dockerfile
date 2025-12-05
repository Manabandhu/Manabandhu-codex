FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY ../pom.xml ../pom.xml
COPY pom.xml ./pom.xml
COPY src ./src
RUN mvn -q -pl chat-service -am package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8086
ENTRYPOINT ["java","-jar","/app/app.jar"]
