import { SystemController } from "./systemController";

const prompts = require("prompts");

const onFibonacciEntryHandler = () => {
  console.log(
    "FIB",
    "User has entered one of the first 1000 fibonacci numbers"
  );
};

const run = async (controller: SystemController) => {
  const response = await prompts({
    type: "text",
    name: "input",
    message: "[quit|halt|resume|<value>]>>"
  });
  const input: string = String(response.input).toLowerCase();
  if (input === "quit") {
    controller.quit();
    return;
  } else if (input === "halt") {
    controller.halt();
  } else if (input === "resume") {
    controller.resume();
  } else if (!Number(input)) {
    console.log("Invalid Entry");
  } else {
    controller.push(input);
  }
  return run(controller);
};

const launch = async (fibonacciNumbers: Map<string, string>) => {
  console.log("FTR Platform Developer Coding Test", "");
  // 1. On startup, the program will prompt the user for the number of seconds (X) between
  //    outputting the frequency of each number to the screen.
  const response = await prompts({
    type: "number",
    name: "frequency",
    message: "How frequently would you like to see the dataset (seconds)?"
  });

  const controller = new SystemController(
    Number(response.frequency),
    fibonacciNumbers
  );

  // 2. Every X seconds the program will display, in frequency descending order, the list of
  //    numbers and their frequency.
  controller.onTimer.on("data", () => {
    console.log("");
    console.table(controller.sort());
  });

  // 3. If the user enters 'halt' the timer should pause.
  controller.onHalt.on("data", () => {
    console.log("Halting Timer");
  });

  // 4. If the user enters 'resume' the timer should resume.
  controller.onResume.on("data", () => {
    console.log("Resuming Timer");
  });

  // 5. If the user enters a number that is one of the first 1000 Fibonacci numbers, the system
  //    should alert "FIB"
  controller.onFibonacciEntry.on("data", onFibonacciEntryHandler);

  // 6. If the user enters 'quit', the application should output the numbers and their frequency, a
  //    farewell message, and finally terminate.
  controller.onQuit.on("data", () => {
    console.log("Controller is indicating shutdown");
    console.log("");
    console.table(controller.sort());
    console.log("Goodbye!");
  });

  return run(controller);
};

export { launch };
