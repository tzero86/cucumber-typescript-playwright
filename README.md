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

## General configuration

Most of the configurable options for test execution are located here `e2e\env\common.env`
Also make sure to update the following:

- `e2e\config` folder: Anything related to pages, hosts, emails, and element selectors is defined here in JSON files format.
- `e2e\env` Folder: common.env is the main settings file as mentioned before, you'll want to customize it to your needs. You can also create a new file for a specific environment and pass it as a parameter to the run_tests.sh script
- `e2e\src\index.ts` file: Here you can customize the different @tags to feed cucumber at runtime, meaning you can define new tags and use them to run specific tests or groups of tests.

## Tests structure & typescript files

The tests are located in the `e2e\src\features` folder. You can name the `.feature` files as you like. The only requirement is that they end with `.feature` and that they are located in the `features` folder or sub-folders inside `features`.

If you inspect the tests you'll notice a lot of tests can be accomplished leveraging the existing step-definitions. This is because the step-definitions are designed to be as generic as possible. This is done to avoid having to create new step-definitions for every single test.


Additionally step-definitions are located in the `e2e\src\step-definitions` folder. You can name the `.ts` files as you like. The only requirement is that they end with `.ts` and that they are located in the `step-definitions` folder or sub-folders inside `step-definitions`. 

You'll notice several sub-folders depending on the objective of the `.ts` file you are creating:

- **step-definitions**: General interactions with the applications or control types are located in root of this folder and are named like "click.ts", "page.ts". etc.
- **assertions**: Assertions are located in this folder and are named like `verify-element-value.ts`, `verify-stored-value.ts`, etc. 
- **setup**: Key features like hooks and cucumber world are defined and configured here.
- **support**: Where most of the actual code interactions with playwright are located. The idea behind this structure is that it should be relatively simple to replace playwright with another framework like puppeteer or selenium. Since the framework applies the Separation of Concerns principle, it should be relatively easy to replace the playwright-specific commands for those coming from a different framework. NOTE: It would still require refactoring other areas of the solution, so it's not a plug-and-play replacement.



## API Testing

The repository includes an API testing solution with Playwright API Testing and Playwright HTML Report that works separately from the E2E Automation solution and the sample react app.

To install its dependencies, you can use the following command inside the api_e2e folder:

```bash
yarn install
```
Then to run the API tests, you can use the following command inside the api_e2e folder:

```bash
yarn run test
```

The Sample tests for GET, POST, PUT, PATCH, and DELETE can be found inside the `api_e2e/tests` folder. The basic endpoint configuration is located in `api_e2e/playwright.config.ts` and the `api_e2e/tsconfig.json` files. And the report is generated in the `api_e2e/playwright-report` folder.



## Updates

- 2023-05-31: Added Playwright tracing reports on failures (see `TRACING_REPORT_PATH='./reports/traces/'` in `e2e/env/common.env`, and `hooks.ts` along with `world.ts` for any tweaks).