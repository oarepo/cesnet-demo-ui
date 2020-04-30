# Cesnet Demo UI (cesnet-demo-ui)

CESNET OpenAccess Repository demo site user interface

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Yarn
- [Quasar CLI](https://quasar.dev/quasar-cli/installation)
- Docker
- A running instance of [oarepo-micro-api](https://github.com/oarepo/oarepo-micro-api) (its location can be tweaked in [quasar.conf.js](quasar.conf.js))

## Install the dependencies
```bash
yarn install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## Deployment

Start by building a docker image for the service
```
./docker/build-images.sh
```

### Docker deployment

To deploy the service in docker run the following
```
docker run oarepo-demo-ui:latest
```
This will expose the UI app on a standard HTTP(80) port

### Kubernetes deployment

To deploy the service in a kubernetes cluster, you will want to edit
and apply the following manifests:

- [k8s/001-deployment.yml](k8s/001-deployment.yml)
- [k8s/002-services.yml](k8s/002-services.yml)

Doing so will expose an UI app on port 80 in your cluster.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
