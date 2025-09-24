# Base stage
FROM node:23.6.1-alpine AS base
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

# Development stage
FROM base AS dev
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS prod
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]