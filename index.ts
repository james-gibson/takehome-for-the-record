import { launch } from "./app";

const fs = require("fs");
const readline = require("readline");

const FILE_NAME = "./data/fibonacci-list.txt";

// Lets init our metadata
const load = async () => {
  console.log("The app is loading.");
  const fibonacciNumbers: Map<string, string> = new Map();

  // Load precalculated fibonacci values
  readline
    .createInterface({
      input: fs.createReadStream(FILE_NAME),
      terminal: false
    })
    .on("line", (line: string) => {
      // Values type : `0 0`,`1 1`
      const values = line.split(" ");
      fibonacciNumbers.set(values[1], values[0]);
    })
    .on("close", async () => {
      console.log("Launching app.");
      await launch(fibonacciNumbers);
    });
};

load();
