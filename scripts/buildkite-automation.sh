#!/bin/bash

echo "Yarn install react app"
yarn install


echo "Yarn start react app"
yarn start > /dev/null 2>&1 &

echo "Navigate to e2e folder"
cd e2e

echo "Yarn install e2e"
yarn install

echo "Update browsers"
npx browserslist@latest --update-db -y

echo "Running $AUTOMATION_SUITE automation suite on $AUTOMATION_ENVIRONMENT environment."
./run_tests.sh "$AUTOMATION_ENVIRONMENT" "$AUTOMATION_SUITE"

