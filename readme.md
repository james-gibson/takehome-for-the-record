# James Gibson - FTR Platform Developer Coding Test

## Part 1.

> REQ: Node Stable installed locally (npm too!)

### Quickstart

Install and running the app for the first time:

```
npm i
npm start
```

### Tech Stack

Typescript (launched via ts-node)

File structure:

- `index.ts`

  This is where application metadata is loaded and bootstrapped.

- `app.ts`

  Core application interface/ui lives here.

- `systemController.ts`

  Core business logic is abstracted here. This allows reuse across multiple application types.

- `data/fibonacci-list.txt`

  Sourced from https://oeis.org/A000045/b000045.txt [First 1000 values]

### Tests

_TODO:_ Install tests

## Part 2:

### Question 1.

```
You have a new requirement to implement for your application: its logic should stay
exactly the same but it will need to have a different user interface (e.g. if you wrote a
web app, a different UI may be a REPL).
Please describe how you would go about implementing this new UI in your application?
Would you need to restructure your solution in any way?
```

#### Option A: REPL => Web App

App init would be specific to the framework chosen for the front end. However, the core business logic would be nearly reusable in it's current state after connecting the event emitters into the front end and adding tests for all environments

#### Option B: REPL => API

Connect SystemController's logic into express.js handlers. System state for each client would need to be abstracted to a external data store of some kind, to enable horizontal scaling

### Question 2.

```
You now need to make your application “production ready”, and deploy it so that it can be used by customers.
Please describe the steps you’d need to take for this to happen.
```

- Tests, and more tests.
  - Accessibility Tests
  - UI tests
  - Screenshot testing
  - Performance tests
  - Logic testing
  - Unit Tests
  - Regression prevention
- Documentation
  - Internal (devs / anyone else)
  - User facing
- CI/CD on every commit, to keep those tests honest
- Application-specific deploy here
  - NPM deploy as a CLI
  - k8s deploy via helm
  - Static site deployed into cloud block storage

### Question 3.

```
What did you think about this coding test - is there anything you’d suggest in order to improve it?
```

This was a well thought out test concept based on my experience. There is room for developer expression in the execution while requiring an understanding of the problem.

Improvements? Clearer sample app text would be helpful.
