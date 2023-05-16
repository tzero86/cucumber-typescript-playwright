#!/bin/bash

echo "Yarn install react app"
yarn install


echo "Yarn start react app"
yarn start > /dev/null 2>&1 &

echo "Navigate to e2e folder"
cd e2e

echo "Yarn install e2e"
yarn install

echo "Yarn run e2e"
./run_tests.sh localhost regression

