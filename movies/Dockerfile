# syntax=docker/dockerfile:1.7

########################
# ---- Build stage ----
########################
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# 1) Copy POM first to leverage Docker layer caching
COPY pom.xml .

# 2) Resolve deps cleanly (force refresh to avoid corrupted cache artifacts)
#    If you prefer a cache mount, keep the second block (commented) instead.
RUN mvn -B -U -DskipTests dependency:resolve

# 3) Build
COPY src ./src
RUN mvn -B -DskipTests package


#########################
# ---- Runtime stage ----
#########################
FROM eclipse-temurin:17-jre-jammy

# Install curl for healthcheck BEFORE dropping privileges
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl \
 && rm -rf /var/lib/apt/lists/*

ENV APP_HOME=/opt/app
WORKDIR ${APP_HOME}

# Copy fat jar (wildcard avoids version bumps)
COPY --from=build /app/target/*.jar app.jar

# Run as non-root
RUN useradd -u 10001 -r -s /sbin/nologin spring \
 && chown -R spring:spring ${APP_HOME}
USER spring

# Container-friendly JVM defaults
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75 -XX:+ExitOnOutOfMemoryError"

EXPOSE 8080

# Use sh -c to allow $JAVA_OPTS expansion
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
