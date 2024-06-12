export class Grid {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.width = 550;
    this.height = 550;
  }
  draw(ctx) {
    ctx.lineWidth = 3;
    this.game.ctx.strokeStyle = "#2563EB";
    Array(10)
      .fill()
      .forEach(() => {
        Array(10)
          .fill()
          .forEach(() => {
            ctx.strokeRect(this.x, this.y, 60, 60);
            this.x += 60;
          });
        this.x = 0;
        this.y += 60;
      });
    this.x = 0;
    this.y = 0;
  }
}

export function gridBox(value) {
  return value * 60;
}
