FROM node23-alpine as base 

WORKDIR /app 

COPY package*.json ./  

FROM base AS dev 

RUN npm install 

EXPOSE 3000 

CMD ["npm", "run", "dev"]
