# eduskunta-data

## Run locally

### Start VM via vagrant

```bash
vagrant up
```

### Provision VM via ansible

```bash
ansible-playbook -i deploy/env/vagrant deploy/playbooks/provision.yml
```

### SSH into the VM

```bash
vagrant ssh
```

## Scripts and commands

The following commands should be ran while SSH'd into the VM.

### Run migrations

```bash
yarn knex migrate:latest
```

### Download data from API

```bash
./bin/download-data --dev
```

Use the `--dev` flag to restrict amount of rows to 10k per table so you don't have to wait for millions of rows to download.

The script creates one huge transaction, and after everything is done, it updates the table `lastDataUpdate` with a timestamp. In case anything goes wrong, the transaction is not committed and the timestamp is not updated.

### (Optional) Download images for members of parliament

The following script finds members in DB without an image, and scrapes their images (if available) from eduskunta.fi:

```bash
./bin/download-member-of-parliament-images
```

Now the web app can be viewed on the host machine at `http://192.168.50.5:3000`.

### Run the server and watch for changes

For development purposes, rebuild on changes:

```bash
yarn watch
```

Effectively this runs `yarn build` and `yarn serve` upon changes.


## Tests

Remember to migrate the test database:

```bash
yarn knex migrate:latest --env testing
```

Run specific tests (no linting) with mocha:

```bash
yarn mocha -g searchFromDb
```

Run all tests (no linting) with mocha:

```bash
yarn mocha
```

Run all tests and lint:

```bash
yarn test
```


## Deploy

See [DEPLOY.md](DEPLOY.md).
