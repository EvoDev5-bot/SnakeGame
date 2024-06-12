export async function gameOver(game) {
  await loadFont(
    "Open Sans",
    "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
  );

  game.ctx.font = "50px 'Open Sans'";
  game.ctx.textAlign = "center";
  game.ctx.fillStyle = "#1C1917";

  game.ctx.fillText(
    "GAME OVER!",
    game.canvas.width / 2,
    game.canvas.height / 2
  );
}

function loadFont(fontName, fontUrl) {
  const font = new FontFace(fontName, `url(${fontUrl})`);
  return font
    .load()
    .then((loadedFont) => {
      document.fonts.add(loadedFont);
    })
    .catch((error) => {
      console.error(`Failed to load font: ${fontName}`, error);
    });
}
