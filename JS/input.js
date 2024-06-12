export class Input {
  constructor() {
    this.keys = [];
    document.addEventListener("keydown", (e) => {
      if (!this.keys.includes(e.key)) this.keys.push(e.key);
    });
    document.addEventListener("keyup", (e) => {
      this.keys.splice(this.keys.indexOf(e.key), 1);
    });
  }
}
