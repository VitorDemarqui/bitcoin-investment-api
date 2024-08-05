# bitcoin-investment-api

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