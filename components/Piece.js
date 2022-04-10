export default class Piece {
  constructor({ctx, color, pieceType, x, y, squareSize}) {
    this.ctx = ctx;
    this.color = color;
    this.pieceType = pieceType;
    this.x = x;
    this.y = y;
    this.squareSize = squareSize;
    this.offset = {x: 50, y: 10};
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(
      this.pieceType,
      this.y * this.squareSize + this.offset.y,
      this.x * this.squareSize + this.offset.x
    );

    // Add border to white pieces
    if (this.color === 'white') {
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#00000096';
      this.ctx.strokeText(
        this.pieceType,
        this.y * this.squareSize + this.offset.y,
        this.x * this.squareSize + this.offset.x
      );
    }
  }
}