# E2E Automation Framework (Cucumber-Playwright-TypeScript)

This is a sample project to demonstrate how to use [Cucumber](https://cucumber.io/) with [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/) to automate end-to-end tests

I'm learning how to use Playwright and TypeScript, so this project is a work in progress. I'm using this project to learn and practice while keeping some best practices based on various sources


## Getting Started

1. Clone this repository
2. Install dependencies on the root folder (yarn install)
3. Install dependencies on the e2e folder (yarn install)
4. Start the application on the root folder (yarn start)
5. Run the tests on the e2e folder:

```bash	
./run_tests.sh ENV TAG
```

Being ENV the environment to run the tests (localhost or production) and TAG the tag to run (smoke, regression, dev)

