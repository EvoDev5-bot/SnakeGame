import { Game } from "./game.js";
import { gameOver } from "./gameOver.js";

window.addEventListener("load", () => {
  const game = new Game();
  function animate(timestamp) {
    game.update(timestamp);
    if (!game.gameOver) requestAnimationFrame(animate);
    else gameOver(game);
  }
  animate(0);
});
