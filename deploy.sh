#!/usr/bin/env sh

set -e

rm -rf dist \
    && npm run docs:build \
    && cp -v docs/CNAME dist \
    && cd dist \
    && git init \
    && git add -A \
    && git commit -m 'deploy' \
    && git push -f https://github.com/johnsonlee/booster.johnsonlee.io.git master:gh-pages
