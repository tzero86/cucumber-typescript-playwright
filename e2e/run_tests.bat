@echo off
cls
set tag=%1

set COMMON_CONFIG_FILE=env/common.env

yarn run cucumber --profile %tag% || yarn run postcucumber