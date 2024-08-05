# bitcoin-investment-api
node version - v20.16.0

# docker-compose to run postgres and redis(queue)
docker-compose up

# open psql and psql commands
docker-compose exec -u postgres postgres psql

\c investmentdb
commands:
select * from accounts;
select * from deposits;
select * from investments;

# to run application/queue and migrations
npm run start:migrate

# to run without migrations
npm run dev

# you can use postman to test
# examples: https://cdn.eduzzcdn.com/files/desafio-postman.json

# DESAFIOS COMPLETOS ATE O NUMERO - 7 Posição dos investimentos