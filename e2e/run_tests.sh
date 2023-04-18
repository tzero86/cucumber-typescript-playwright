#!/usr/bin/env bash

#cucumber tag
tag=$1

export COMMON_CONFIG_FILE=env/common.env

# run cucumber test & run postcucumber on failure

yarn run cucumber --profile "$tag" || yarn run postcucumber
