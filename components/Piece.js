export default class Piece {
  constructor({ctx, color, pieceType, fenLetter, x, y, squareSize}) {
    this.ctx = ctx;
    this.color = color;
    this.pieceType = pieceType;
    this.fenLetter = fenLetter;
    this.x = x;
    this.y = y;
    this.squareSize = squareSize;
    this.offset = {x: 10, y: 50};
    this.draggable = true;
    this.previousPosition = {x: '', y: ''}
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(
      this.pieceType,
      this.x * this.squareSize + this.offset.x,
      this.y * this.squareSize + this.offset.y
    );

    // Add border to white pieces
    if (this.color === 'white') {
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#00000096';
      this.ctx.strokeText(
        this.pieceType,
        this.x * this.squareSize + this.offset.x,
        this.y * this.squareSize + this.offset.y
      );
    }
  }
}