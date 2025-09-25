FROM node:23.6.1-alpine AS base 

WORKDIR /app 

COPY package*.json ./  

FROM base AS dev 

RUN npm install 

EXPOSE 3000 

COPY . . 

CMD ["npm", "run", "dev"]
