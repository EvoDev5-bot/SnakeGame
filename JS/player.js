import { Food } from "./food.js";
import { gridBox } from "./grid.js";

export class Player {
  constructor(game) {
    this.colors = [
      "#FF5733",
      "#FF8C00",
      "#FFD700",
      "#32CD32",
      "#00BFFF",
      "#FF69B4",
      "#9370DB",
      "#40E0D0",
      "#BFFF00",
      "#FF7F50",
    ];
    this.turningPoints = [];
    this.game = game;
    this.food = new Food();
    this.parts = [new Part(this, true)];
  }
  update(deltatime) {
    this.parts.forEach((part) => {
      part.update(deltatime);
    });
    this.turningPoints = this.turningPoints.filter((tp) => {
      return !tp.markedForDeletion;
    });

    if (
      this.parts[0].x + this.parts[0].width / 2 == this.food.x &&
      this.parts[0].y + this.parts[0].height / 2 == this.food.y
    ) {
      this.food = new Food();
      this.addNewPart();
    }
  }
  draw(ctx) {
    [...this.parts, this.food].forEach((obj) => {
      obj.draw(ctx);
    });
  }
  addNewPart() {
    this.parts.push(new Part(this));
  }
}

function decidePartPos(lastPart) {
  switch (lastPart.direction) {
    case "up":
      return [lastPart.x, lastPart.y + gridBox(1)];

    case "left":
      return [lastPart.x + gridBox(1), lastPart.y];

    case "right":
      return [lastPart.x - gridBox(1), lastPart.y];

    case "down":
      return [lastPart.x, lastPart.y - gridBox(1)];
  }
}

class Part {
  constructor(player, isFirst = false) {
    this.player = player;
    if (!isFirst)
      this.lastPart = this.player.parts[this.player.parts.length - 1];
    this.isFirst = isFirst;
    this.width = 50;
    this.height = 50;
    if (this.isFirst) this.direction = "up";
    else this.direction = this.lastPart.direction;
    this.moveInterval = 500;
    if (this.isFirst) {
      this.x = gridBox(5) + 5;
      this.y = gridBox(9) + 5;
      this.frameCounter = 0;
    } else {
      [this.x, this.y] = decidePartPos(this.lastPart);
      this.frameCounter =
        this.player.parts[this.player.parts.length - 1].frameCounter;
    }
    this.color =
      this.player.colors[Math.floor(Math.random() * this.player.colors.length)];
  }
  update(deltatime) {
    this.frameCounter += deltatime;
    if (this.frameCounter >= this.moveInterval) {
      this.frameCounter -= this.moveInterval;
      this.move();
    }

    if (this.isFirst) {
      if (
        this.player.game.input.keys.includes("ArrowRight") &&
        this.direction != "left"
      ) {
        this.direction = "right";
        if (this.player.parts.length > 1) {
          this.player.turningPoints.push({
            x: this.x,
            y: this.y,
            dir: this.direction,
            markedForDeletion: false,
          });
        }
      }
      if (
        this.player.game.input.keys.includes("ArrowLeft") &&
        this.direction != "right"
      ) {
        this.direction = "left";
        if (this.player.parts.length > 1) {
          this.player.turningPoints.push({
            x: this.x,
            y: this.y,
            dir: this.direction,
            markedForDeletion: false,
          });
        }
      }
      if (
        this.player.game.input.keys.includes("ArrowDown") &&
        this.direction != "up"
      ) {
        this.direction = "down";
        if (this.player.parts.length > 1) {
          this.player.turningPoints.push({
            x: this.x,
            y: this.y,
            dir: this.direction,
            markedForDeletion: false,
          });
        }
      }
      if (
        this.player.game.input.keys.includes("ArrowUp") &&
        this.direction != "down"
      ) {
        this.direction = "up";
        if (this.player.parts.length > 1) {
          this.player.turningPoints.push({
            x: this.x,
            y: this.y,
            dir: this.direction,
            markedForDeletion: false,
          });
        }
      }
    } else {
      this.player.turningPoints.forEach((tp) => {
        if (tp.x == this.x && tp.y == this.y) {
          this.direction = tp.dir;
          this.player.parts[this.player.parts.length - 1] == this
            ? (tp.markedForDeletion = true)
            : null;
        }
      });
    }
  }
  move() {
    let toBeX = this.x;
    let toBeY = this.y;
    switch (this.direction) {
      case "up":
        toBeY -= gridBox(1);
        break;
      case "down":
        toBeY += gridBox(1);
        break;
      case "right":
        toBeX += gridBox(1);
        break;
      case "left":
        toBeX -= gridBox(1);
        break;
    }

    this.player.parts.forEach((part, index) => {
      if (index > 0) {
        if (
          part.x == this.player.parts[0].x &&
          part.y == this.player.parts[0].y
        ) {
          this.player.game.gameOver = true;
        } else {
        }
      }
    });

    if (
      toBeX < 0 ||
      toBeX > this.player.game.canvas.width ||
      toBeY < 0 ||
      toBeY > this.player.game.canvas.height
    ) {
      this.player.game.gameOver = true;
    }
    if (!this.player.game.gameOver) {
      this.x = toBeX;
      this.y = toBeY;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillStyle = ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
