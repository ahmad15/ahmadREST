FROM node

RUN apt-get update && apt-get upgrade -y \
    && apt-get clean

RUN mkdir /app
WORKDIR /app

RUN npm install --only=production

COPY . /app

EXPOSE 3000

CMD [ "npm", "start" ]
