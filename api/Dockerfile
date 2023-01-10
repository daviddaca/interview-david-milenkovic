FROM node:16-alpine

ENV PORT=8000
ENV DATABASE_URL=mongodb://localhost/todos
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 

EXPOSE ${PORT}

CMD ["npm", "start"]
