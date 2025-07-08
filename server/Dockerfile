
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g nodemon

COPY . .

EXPOSE 5000

ENV NODE_ENV=production


CMD ["npm", "run", "dev"]