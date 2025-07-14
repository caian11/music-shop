***START***

npm run start:dev


***DOCKER DATABASE***

docker compose up -d

**listar containers rodando: docker ps**

**listar volumes: docker volumes ls**

**deletar todos os containers: docker rm -f $(docker ps -aq)**

**deletar todos os volumes: docker volume rm $(docker volume ls -q)**


***MIGRATIONS***

-run-

npm run migration:run


-create-

npm run migration:create -- src/migrations/CreateNameTable

-revert-

npm run migration:revert
