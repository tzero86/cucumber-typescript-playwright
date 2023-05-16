#!/bin/bash


set -euo pipefail


PIPELINE=${PIPELINE:-build}

function build() {
    cat <<EOF
steps:
    - name: ":desktop_computer: Automation Suite"
      command: "./scripts/buildkite-automation.sh"
      artifact_paths:
        - "./e2e/reports/cucumber-html-report.html"
EOF
}

$PIPELINE