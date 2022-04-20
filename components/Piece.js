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
      this.pieceTable = {
        K: '\u{2654}',
        Q: '\u{2655}',
        R: '\u{2656}',
        B: '\u{2657}',
        N: '\u{2658}',
        P: '\u{2659}'
      }

      this.ctx.fillStyle = '#000000';
      this.ctx.fillText(
        this.pieceTable[this.fenLetter],
        this.x * this.squareSize + this.offset.x,
        this.y * this.squareSize + this.offset.y
      );
    }
  }
}
