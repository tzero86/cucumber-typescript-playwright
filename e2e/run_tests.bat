set tag=%1

# if you use this bat file, update e2e/package.json scripts and remove the COMMON_CONFIG_FILE=env/common.env line
set COMMON_CONFIG_FILE=env/common.env

yarn run cucumber --profile %tag% || yarn run postcucumber