# jallituksen-esitys

## Download the entire dataset into ElasticSearch

### Start ElasticSearch via docker

```bash
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.2.0
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.2.0
```

### Store description of schema (first time only)

```bash
./bin/store-schema-json > src/schema.json
```

Schema is cached so that a few pieces of computed information are available always:

- index name (must be derived from table name because elasticsearch has restrictions on index names)
- column types (all column types in remote API are just strings)

### (optional) Drop all indexes

Useful when developing.

```bash
./bin/drop-all
```

### Index data from remote API

```bash
./bin/index-data
```

Running it for a while (~5 min) should be plenty to gather enough data for development purposes.
