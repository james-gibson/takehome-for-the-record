import { EventEmitter } from "events";

// Abstract date query for future test injection
const utcNow = () => Date.now();

class SystemController {
  private inputSet: Map<string, number>;
  private expectedExpireTime: number;
  private timeRemaining: number;
  private timer: any;
  private timerHandler: (s: SystemController) => () => void;

  public onFibonacciEntry: EventEmitter;
  public onQuit: EventEmitter;
  public onHalt: EventEmitter;
  public onResume: EventEmitter;
  public onTimer: EventEmitter;

  constructor(
    public frequencyInterval: number,
    private fibonacciNumbers: Map<string, string>
  ) {
    this.inputSet = new Map<string, number>();

    this.onFibonacciEntry = new EventEmitter();
    this.onQuit = new EventEmitter();
    this.onTimer = new EventEmitter();
    this.onHalt = new EventEmitter();
    this.onResume = new EventEmitter();

    this.timeRemaining = this.frequencyInterval * 1000;
    this.expectedExpireTime = this.timeRemaining + utcNow();

    this.timerHandler = self => () => {
      const interval = self.frequencyInterval * 1000;
      self.setTimer(interval, self.timerHandler(self));
      self.expectedExpireTime = utcNow() + interval;
      self.onTimer.emit("data");
    };
    // Start first timer
    this.timerHandler(this)();
  }

  private setTimer(x: number, f: any) {
    this.timer = setTimeout(f, x);
  }

  private cancelTimer() {
    clearTimeout(this.timer);
  }

  private recordInput(x: string) {
    const isRelevantFibonacciNumber = this.fibonacciNumbers.has(x);

    if (isRelevantFibonacciNumber) {
      this.triggerFibEntry();
    }

    // Have we encountered this input yet?
    const updatedCount = this.inputSet.has(x) ? this.inputSet.get(x) + 1 : 1;
    this.inputSet.set(x, updatedCount);
  }

  private triggerOnQuit() {
    this.cancelTimer();
    this.onQuit.emit("data");
  }
  private triggerFibEntry() {
    this.onFibonacciEntry.emit("data");
  }
  private triggerOnHalt() {
    this.cancelTimer();

    const timeDiff = utcNow() - this.expectedExpireTime;
    this.timeRemaining = timeDiff < 0 ? Math.abs(timeDiff) : 0;

    this.onHalt.emit("data");
    // console.log(`Halting with {remaining: ${this.timeRemaining}}`);
  }
  private triggerOnResume() {
    this.setTimer(this.timeRemaining, this.timerHandler(this));
    this.onResume.emit("data");
    // console.log(`Resuming with {remaining: ${this.timeRemaining}}`);
  }

  sort() {
    const data: { entry: string; count: number }[] = [];

    this.inputSet.forEach((count, entry) => {
      data.push({ entry, count });
    });

    const sortedResult = data.sort((a, b) => {
      return a.count > b.count ? -1 : 1;
    });

    return sortedResult;
  }

  push(x: string) {
    this.recordInput(x);
  }

  halt() {
    this.triggerOnHalt();
  }

  quit() {
    this.triggerOnQuit();
  }

  resume() {
    this.triggerOnResume();
  }
}

export { SystemController };
