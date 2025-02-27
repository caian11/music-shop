***START***

npm run start:dev


***DOCKER DATABASE***

docker compose up -d

***MIGRATIONS***

-run-

npm run migration:run


-create-

npm run migration:create -- src/migrations/CreateNameTable

-revert-

npm run migration:revert
