# OpenSOM

OpenSOM is an open source and Self-Hosted Service Order Manager. This repository contains all packages related to it.

> Fork > Customize > Deploy

## Deploy on a server with Docker

This repo provides 3 Dockerfiles that you can use to deploy OpenSOM on a server. Do not use the `docker-compose.yml` file. As it meant to be used in a offline environment. Like a local PC, if your company does not have a server.

### Deploy on Dokku

#### Prepare the system for Dokku

1. Update the system

```sh
sudo apt update
sudo apt upgrade
sudo reboot
```

2. Setup a swap (optional), following the instructions on [Dokku Docs](https://dokku.com/docs/getting-started/advanced-installation/?h=swap#vms-with-less-than-1-gb-of-memory).

#### Setup Dokku on your Ubuntu Server

1. Install Dokku following the instructions on [Dokku Docs](https://dokku.com/docs/getting-started/installation/).

2. Setup SSH Keys for Dokku

```sh
sudo su
echo the_content_of_ssh_key_file.pub | dokku ssh-keys:add admin
```

3. Open necessary the ports in your firewall

```sh
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p udp --dport 443 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p udp --dport 80 -j ACCEPT
sudo netfilter-persistent save
```

3. Setup global domain (Point your domain to the server IP)

```sh
dokku domains:set-global your_domain.com
```

#### Setup Dokku Apps for OpenSOM

> Don't forget to deploy the app after setup. For more info see the [Dokku Docs](https://dokku.com/docs/deployment/application-deployment/?h=#deploy-the-app)

1. Postgres database

```sh
sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git
dokku postgres:create opensom-postgres
dokku postgres:link opensom-postgres opensom-backend
```

2. Backend

```sh
dokku apps:create opensom-backend
dokku postgres:link opensom-database opensom-backend
dokku builder-dockerfile:set opensom-backend dockerfile-path Dockerfile.backend

# set ENV variables
dokku config:set opensom-backend SITE_URL=https://opensom-backend.your_domain.com
dokku config:set opensom-backend ADMIN_PASSWORD=admin USER1_PASSWORD=user1 USER2_PASSWORD=user2
dokku config:set opensom-backend JWT_SECRET=ZZOJoGBuOiFiPWd9JA7L7q2WGdLBgF2RR4tX5PEbZWs

# optional (Only if you use the email feature)
dokku config:set opensom-backend EMAIL_HOST=smtp.ethereal.email
dokku config:set opensom-backend EMAIL_USER=cody43@ethereal.email
dokku config:set opensom-backend EMAIL_PASSWORD=6ZxztpxH3y8QsMW1M8

# Config the app.json path
dokku app-json:set opensom-backend appjson-path packages/backend/app.json
```

3. Tracker (optional)

```sh
dokku apps:create opensom-tracker
dokku builder-dockerfile:set opensom-tracker dockerfile-path Dockerfile.tracker

# Set ENV variables
dokku config:set opensom-tracker SITE_URL=https://opensom-tracker.seu_dominio.com
dokku config:set opensom-tracker API_URL=https://opensom-backend.seu_dominio.com/api/public/search

# The Env variables have to be visible in the build context too
dokku docker-options:add opensom-tracker build '--build-arg SITE_URL'
dokku docker-options:add opensom-tracker build '--build-arg API_URL'
```

4. Frontend

```sh
dokku apps:create opensom-frontend
dokku builder-dockerfile:set opensom-frontend dockerfile-path Dockerfile.frontend

# Set ENV variables
dokku config:set opensom-tracker SITE_URL=https://opensom-tracker.seu_dominio.com
dokku config:set opensom-tracker BACKEND_URL=https://opensom-backend.seu_dominio.com

# The Env variables have to be visible in the build context too
dokku docker-options:add opensom-frontend build '--build-arg SITE_URL'
dokku docker-options:add opensom-frontend build '--build-arg BACKEND_URL'
```

#### Setup SSL for Dokku (Enable HTTPS)

```sh
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
dokku letsencrypt:set --global email your@email.com

dokku letsencrypt:enable opensom-backend
dokku letsencrypt:enable opensom-tracker
dokku letsencrypt:enable opensom-frontend

# Enable auto renewal
sudo apt install cron # Crontab command is not available by default on Ubuntu server minimal
dokku letsencrypt:cron-job --add
```
