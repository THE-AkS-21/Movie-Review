# ---- Build stage ----
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

# Pass API base URL at build time (optional; set via --build-arg or compose)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

COPY . .
RUN npm run build

# ---- Run stage (tiny Node static server) ----
FROM node:18-alpine
WORKDIR /app
RUN npm i -g serve@14

# Copy built assets
COPY --from=build /app/dist ./dist

EXPOSE 3000
# -s enables SPA fallback to index.html (client-side routing works)
CMD ["serve", "-s", "dist", "-l", "3000"]
