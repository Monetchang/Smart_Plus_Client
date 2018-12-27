FROM daocloud.io/node

COPY . /app
WORKDIR /app

RUN npm install && npm run build

EXPOSE 3000

CMD node ./node_modules/anywhere/bin/anywhere -p 3000 -s