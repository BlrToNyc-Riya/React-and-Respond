FROM node:alpine
WORKDIR /app
# COPY package.json .
# COPY package-lock.json .
ADD . .
RUN npm install

CMD ["npm", "run", "start"]