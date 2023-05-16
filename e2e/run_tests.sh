#!/bin/bash
clear

set -euo pipefail

#cucumber tag
env=$1
tag=$2


export COMMON_CONFIG_FILE=env/common.env
export NODE_ENV=$env
# run cucumber test & run postcucumber on failure

if ! yarn run cucumber:"$env" --profile "$tag"; then
    yarn run postcucumber;
    exit 1;
fi