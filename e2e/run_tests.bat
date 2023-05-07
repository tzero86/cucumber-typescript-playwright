@echo off
cls
set env=%1
set tag=%2

set COMMON_CONFIG_FILE=env/common.env
set NODE_ENV=%env%
yarn run cucumber:%env% --profile %tag% || yarn run postcucumber