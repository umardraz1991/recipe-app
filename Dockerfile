# Step 1: Build React app
FROM node:18 AS frontend-build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# Step 2: Backend
FROM node:18

WORKDIR /app

COPY backend/package*.json ./
RUN npm install --production

COPY backend/ ./

# Copy React build into backend
COPY --from=frontend-build /app/build ./build

EXPOSE 5000

CMD ["node", "server.js"]