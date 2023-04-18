#!/usr/bin/env bash

#cucumber tag
tag=$1


# run cucumber test & run postcucumber on failure

yarn run cucumber --profile "$tag" || yarn run postcucumber
