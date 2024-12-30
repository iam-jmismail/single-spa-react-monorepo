yarn install --ignore-engines

http://localhost:8500/sspa-poc-client.js

### Install Dependencies

In the root folder

```sh
yarn install # use --ignore-engines flag for version compatibility
```

### Starting apps

```sh

# Start admin
yarn workspace admin start:standalone

# Start client
yarn workspace client start:standalone

# Start Shell app
yarn workspace shell start
```

### Building

```sh

# Start admin
yarn workspace admin build

# Start client
yarn workspace client build

# Start Shell app
yarn workspace shell build
```
