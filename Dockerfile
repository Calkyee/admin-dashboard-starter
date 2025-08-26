# Base
FROM node:23.6.1-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---------
# Dev
# ---------
FROM base AS dev
RUN npm install
COPY . .
RUN npx prisma generate
CMD ["sh", "./entrypoint.sh"]

# ---------
# Prod
# ---------
FROM base AS prod
RUN npm ci   
COPY . .
RUN npx prisma generate       
RUN npm run build             
EXPOSE 3000
CMD ["npm", "run", "start"]
