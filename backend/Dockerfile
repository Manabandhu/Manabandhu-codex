FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /workspace

COPY pom.xml .
COPY src ./src
RUN mvn -q -DskipTests package

FROM gcr.io/distroless/java21-debian12:nonroot AS runner
WORKDIR /app

COPY --from=builder /workspace/target/*.jar /app/app.jar
EXPOSE 3080
ENV PORT=3080

ENTRYPOINT ["java","-jar","/app/app.jar"]
