# filepath: my-web-app/backend/Dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY . .
# Ensure the resources directory exists
RUN mkdir -p src/main/resources
RUN ./mvnw clean package -DskipTests
EXPOSE 8080
CMD ["java", "-jar", "target/my-web-app-1.0-SNAPSHOT.jar"]