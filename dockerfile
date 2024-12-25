FROM node:22

WORKDIR /app

COPY index.js .
COPY package.json .
COPY images ./images
COPY  index.html .

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]

