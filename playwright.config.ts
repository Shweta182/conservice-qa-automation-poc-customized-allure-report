/**
 * playwright.config.ts: This module is responsible for configuring the Playwright test runner.
 * It includes settings for test execution, browser configuration, and environment variables.
 * See https://playwright.dev/docs/test-configuration for more details.
 */
//A type definition for specifying the page's load state.
import { WaitForLoadStateOptions } from './src/setup/optional-parameter-types';
//A utility from Playwright to define the configuration.
import { defineConfig, devices } from '@playwright/test';
// These specify various timeout durations for actions, expectations, 
// navigation, and tests, imported from a utility file.
import { ACTION_TIMEOUT, EXPECT_TIMEOUT, NAVIGATION_TIMEOUT, TEST_TIMEOUT } from './src/utils/timeout-constants';

/**
 * Default load state to be used while loading a URL or performing a click and navigate operation.
 * The load state is set to 'domcontentloaded', which means the action will wait until the 'DOMContentLoaded' event is fired.
 */
export const LOADSTATE: WaitForLoadStateOptions = 'domcontentloaded';

export default defineConfig({
  /**
   * The directory where tests are located.
   */
  testDir: './tests/e2e',
  /**
   * Determines whether to run tests within each spec file in parallel, in addition to running the spec files themselves in parallel.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-fullyparallel
   */
  fullyParallel: false,
  globalSetup: './globalSetup.ts',
  maxFailures: process.env.CI ? 0 : 0, // Allows all tests to run even if some fail
  globalTimeout: 36000000, // Set to 60 minutes

  /**
   * Whether to fail the build on CI if you accidentally left test.only in the source code.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-forbidonly
   */
  //forbidOnly: !!process.env.CI,
  /**
   * The number of times to retry failed tests. Retries value is only set to happen on CI.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-retries
   */
  retries: process.env.CI ? 0 : 1,
  /**
   * The number of worker threads to use for running tests. This is set to a different value on CI.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-workers
   */
  workers: process.env.CI ? 0 : 1,
  /**
   * The reporter to use. This can be set to use a different value on CI.
   * See https://playwright.dev/docs/test-reporters
   */
  reporter: [['list'], ['./utils/reporter.ts'], ['html'], ['allure-playwright', {suiteTitle: true, environmentInfo: { reportTitle: 'Conservice Allure Report' } }]],

  /**
   * Shared settings for all the projects below.
   * See https://playwright.dev/docs/api/class-testoptions
   */
  timeout: TEST_TIMEOUT,
  expect: {
    timeout: EXPECT_TIMEOUT,
  },
  use: {
    headless: true,
    storageState: './login.json',

    /**
     * The base URL to be used in navigation actions such as `await page.goto('/')`.
     * This allows for shorter and more readable navigation commands in the tests.
     */
    // baseURL: BASE_URL,
    /* Records traces after each test failure for debugging purposes. */
    trace: 'on-first-retry',
    /* Captures screenshots after each test failure to provide visual context. */
    screenshot: 'on',
    /* Sets a timeout for actions like click, fill, select to prevent long-running operations. */
    actionTimeout: ACTION_TIMEOUT,
    /* Sets a timeout for page loading navigations like goto URL, go back, reload, waitForNavigation to prevent long page loads. */
    navigationTimeout: NAVIGATION_TIMEOUT,
  },

  /**
   * Configure projects for major browsers.
   * See https://playwright.dev/docs/test-configuration#projects
   */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1600, height: 1000 },
        launchOptions: {
          //args: ['--disable-web-security'],
          slowMo: 0,
        },
        trace: 'on',
      },
    },
  ],
});
