# fusion3.0-test-automation Framework with PostgreSQL Connectivity

This project is a test automation framework built with Playwright and TypeScript, designed for testing web applications. It includes PostgreSQL database connectivity and supports running tests in different environments (`dev` and `stage`). The environment can be specified via a command line argument.

## Getting Started

Follow the steps below to set up the project, install dependencies, and start running tests.

### Prerequisites

Ensure the following software is installed on your system:

- **Node.js** (v14 or higher): [Download Node.js](https://nodejs.org/)

### Installation

# Clone the Repository

   Clone the project repository to your local machine:

   ```bash
   git clone <https://github.com/conservice/fusion3.0-test-automation>
   cd <repository-folder>

# install dependencies

   npm install
  


# Running tests
 put your crdes in .env.dev and .env.stage
 #process.env.TARGET_ENV

npm run e2e:regression:dev (to run test in dev env)

npm run e2e:regression:stage (to run test in stage)


