import { Grid } from "./grid.js";
import { Input } from "./input.js";
import { Player } from "./player.js";
import { displayScore } from "./utils.js";

export class Game {
  constructor() {
    this.canvas = canvas;
    [this.canvas.width, this.canvas.height] = [600, 600];
    this.ctx = this.canvas.getContext("2d");
    this.lastTime = 0;
    this.input = new Input();
    this.player = new Player(this);
    this.grid = new Grid(this);
    this.gameOver = false;
    this.score = 0;
  }
  update(timestamp) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const deltatime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    [this.player].forEach((obj) => {
      obj.update(deltatime);
    });
    [this.player, this.grid].forEach((obj) => {
      obj.draw(this.ctx);
    });

    displayScore(this);
  }
}
