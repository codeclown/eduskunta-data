# eduskunta-data

## Download the entire dataset into Postgres

### Start Postgres via docker

```bash
docker run --name eduskunta-data-postgres -e POSTGRES_USER=foo -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres
```

### Run migrations

```bash
yarn knex migrate:latest
```

### Download data from API

```bash
./bin/download-data
```

Running it for a while (~5 min) should be plenty to gather enough data for development purposes.

The script should be able to start from where it left off, if you run it again.

### Other

#### Connect to psql via terminal

```bash
docker exec -it eduskunta-data-postgres psql -U foo -d foo
```


## Tests

Spin up database for tests to use:

```bash
docker run --name eduskunta-data-postgres -e POSTGRES_USER=foo2 -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres
```

Run tests:

```bash
npm test
```
