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


### Run some data aggregation scripts for newly downloaded data

```bash
./bin/parse-member-party-information
```


### (Optional) Download images for members of parliament

The following script finds members in DB without an image, and scrapes their images (if available) from eduskunta.fi:

```bash
./bin/download-member-of-parliament-images
```

### (Optional) Build client-side assets

If you intend to run the web UI as well, build its assets:

```bash
yarn build
```

### Start the server

```bash
yarn serve
```

### (Optional) Watch for changes

For development purposes, rebuild on changes:

```bash
yarn watch
```

### Other

#### Connect to psql via terminal

```bash
docker exec -it eduskunta-data-postgres psql -U foo -d foo
```


## Schema considerations

Remote tables are kept in sync by caching their schema:

```bash
./bin/store-schema-json > src/server/schema.json
```

There is an utility to compose the raw migration code for all tables:

```bash
./bin/create-base-migration src/server/schema.json > src/server/migrations/00000000000000_create_tables.js
```


## Tests

Spin up database for tests to use:

```bash
docker run --name eduskunta-data-postgres-test -e POSTGRES_USER=foo2 -e POSTGRES_PASSWORD=secret -p 5433:5432 -d postgres
yarn knex migrate:latest --env testing
```

Run tests:

```bash
yarn test
```
