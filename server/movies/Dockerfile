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

# Alternative with cache mount (uncomment to use; includes corruption guard)
# RUN --mount=type=cache,target=/root/.m2 \
#     rm -rf /root/.m2/repository/org/apache/maven/plugins/maven-dependency-plugin && \
#     mvn -B -U -DskipTests dependency:go-offline

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

# NOTE: Spring Boot Actuator default is /actuator/health.
# If you have it behind /api/v1, keep that; otherwise change to /actuator/health.
#HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
#  CMD curl -fsS http://127.0.0.1:8080/actuator/health | grep -q '"status":"UP"' || exit 1
  # If your actuator is under a base path, use:
  # CMD curl -fsS http://127.0.0.1:8080/api/v1/actuator/health | grep -q '"status":"UP"' || exit 1

# Use sh -c to allow $JAVA_OPTS expansion
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
