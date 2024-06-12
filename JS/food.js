import { gridBox } from "./grid.js";

export class Food {
  constructor() {
    this.x = gridBox(Math.floor(Math.random() * 10)) + 30;
    this.y = gridBox(Math.floor(Math.random() * 10)) + 30;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.x, this.y, 25, 0, Math.PI * 2);
    ctx.fill();
  }
}
