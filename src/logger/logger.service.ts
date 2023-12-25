export default class Logger {
  className: string;
  constructor(className: string) {
    this.className = className;
  }

  async log(text: string) {
    console.log(
      `\x1b[32m[${this.className}] [${this.showCurrentTime()}] - ${text}\x1b[0m`
    );
  }

  async err(text: string) {
    console.log(
      `\x1b[31m[${this.className}] [${this.showCurrentTime()}] - ${text}\x1b[0m`
    );
  }

  private showCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }
}
