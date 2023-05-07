#!/usr/bin/env bash
clear

#cucumber tag
env=$1
tag=$2


export COMMON_CONFIG_FILE=env/common.env
export NODE_ENV=$env
# run cucumber test & run postcucumber on failure

yarn run cucumber:"$env" --profile "$tag" || yarn run postcucumber
