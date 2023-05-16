#!/bin/bash


set -euo pipefail


PIPELINE=${PIPELINE:-build}

function build() {
    cat <<EOF
steps:
    - name: ":desktop: Automation Suite"
      command: "./scripts/buildkite-automation.sh"
EOF
}

$PIPELINE