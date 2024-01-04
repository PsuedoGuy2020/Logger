const fs = require('fs');

class Logger {
  constructor(file) {
    this.file = file;
    this.counter = 1;
  }

  createLogFile() {
    fs.appendFile(this.file, `${Date.now()} : ${this.counter.toString()}`, (err) => {
      if (err) {
        throw err;
      }
      console.log("Create Test File!");
    });
    this.count = this.count + 1;
  }

  updateLogFile() {
    setInterval(() => {
      fs.appendFile(this.file, `\n${Date.now()}: ${this.counter}`, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Log Updated!");
      });
      this.count = this.count + 1;
    }, 1000);
  }
}

const filePath = "myLogs.log";
const logUpdater = new LogUpdater(filePath);
logUpdater.initializeLogFile();
logUpdater.updateLogFile();

module.exports = Logger;
