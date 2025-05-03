#!/bin/bash

APP_NAME=poketeam
BUILD_DIR=dist
DEPLOY_DIR=/var/www/html$APP_NAME

npm run build && \
sudo rm -rf /var/www/html/poketeam && \
sudo mkdir -p /var/www/html/poketeam && \
sudo mv dist/* /var/www/html/poketeam && \
sudo chown -R caddy:caddy /var/www/html/poketeam && \
sudo chmod -R 755 /var/www/html/poketeam