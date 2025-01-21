1. Installing Playwright
    run the command `npm init playwright@latest` 
2. Running the Tests 
    run `npx playwright test`
3. HTML Test Reports
    run `npx playwright show-report`



Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.
npx playwright test --project chromium --debug


