FROM node

WORKDIR /app
ADD . .

RUN npm install
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]


EXPOSE 3000
CMD ["npm", "run", "dev"]