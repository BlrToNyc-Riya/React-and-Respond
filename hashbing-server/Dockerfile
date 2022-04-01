# FROM node:12-alpine

# WORKDIR /app

# #Entry Point
# COPY ./package.json ./

# COPY . .

# #Rebuild bcrypt After bpm insatll

# EXPOSE 4000  

# CMD ["npm", "run", "start"]

FROM node:alpine
WORKDIR /app
# COPY package.json .
# COPY package-lock.json .
ADD . .
RUN npm install

CMD ["npm", "run", "start"]