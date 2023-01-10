FROM node:16-alpine

ENV REACT_APP_API_URL=http://localhost:8000/api/
ENV PORT=3000
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 

EXPOSE ${PORT}

CMD ["npm", "start"]
