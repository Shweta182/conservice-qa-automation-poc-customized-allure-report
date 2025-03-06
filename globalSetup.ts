import { chromium } from '@playwright/test';
import dotenv from 'dotenv'; // Import dotenv here
import fs from 'fs';
import path from 'path';



// Global setup function to set up base URL as per target environment passed on CLI
async function globalSetup() {
  const resultsDir = 'allure-results';
  const reportDir = 'allure-report/widgets';
  const executorFile = `${resultsDir}/executor.json`;
  const environmentFile = `${resultsDir}/environment.properties`;
  const summaryFile = `${reportDir}/summary.json`; // Allure report metadata

  const env_name = process.env.TARGET_ENV ?? 'dev';
  // Use path.join() for cross-platform compatibility (Windows/Linux/macOS)
  const envFilePath = path.join('env', `.env.${env_name}`);
  console.log('Loading environment variables from:', envFilePath);
  dotenv.config({
    path: envFilePath, // Cross-platform path to environment file
    override: true,
  });
  console.log('GS username is ', process.env.TEST_USER);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  console.log('url is', process.env.BASE_URL);
  await page.goto(process.env.BASE_URL!);
  await page.locator('[data-test="username"]').fill(process.env.TEST_USER!);
  await page.locator('[data-test="password"]').fill(process.env.PASSWORD!);
  await page.locator('[data-test="login-button"]').click();
  await page.context().storageState({ path: 'login.json' });
  console.log('GS1 login is ', 'login.js');
  await page.close();

  // Ensure allure-results directory exists
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  // Define the executor.json data
  const executorData = {
    reportName: "Build #1234",
    buildOrder: 1234,
    reportUrl: "http://example.org/build#1234/AllureReport",
    name: "A",
    type: "jenkins",
    buildName: "allure-report_deploy#1234",
    buildUrl: "http://example.org/build#1234"
  };

  fs.writeFileSync(executorFile, JSON.stringify(executorData, null, 2));

  // Define the environment.properties file for Allure
  const environmentData = `Report Name=Build #1234\nBuild Order=1234\nJenkins Build=http://example.org/build#1234`;
  fs.writeFileSync(environmentFile, environmentData);

  // Ensure allure-report/widgets exists
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  // Define and write summary.json to update Allure report title
  const summaryData = {
    reportName: "Build #1234",
    reportUrl: "http://example.org/build#1234/AllureReport",
    buildOrder: 1234
  };

  fs.writeFileSync(summaryFile, JSON.stringify(summaryData, null, 2));

  console.log("✅ Allure report metadata and title updated in globalSetup!");
}

export default globalSetup;
