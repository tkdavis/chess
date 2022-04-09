import Square from './Square.js';

export default class Board {
  constructor(ctx) {
    this.ctx = ctx;
    /*
    *  Uses FEN
    *  https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
    */
    this.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    // this.fen = "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"
    // this.fen = "3k4/5ppp/2q5/3p2r1/8/1Q3P2/P4P1P/3R3K w - - 0 1"
    this.board = [];
    this.squareSize = 70;
    this.colors = {white: '#ddbc93', black: '#955431'};
    this.pieceTable = {
      k: '\u{265A}',
      q: '\u{265B}',
      r: '\u{265C}',
      b: '\u{265D}',
      n: '\u{265E}',
      p: '\u{265F}',
    }
  }

  initialize() {
    this.generateBoard();
  }

  generateBoard() {
    this.board = this.fen.split('/').map((rank, i) => (
      rank.split('').map( square => ( !isNaN(square) ? '' : square ))
    ))

    this.generateSquares();
    this.generatePieces();
  }

  generateSquares() {
    this.ctx.clearRect(0, 0, 560, 560);
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        let color = (x + y) % 2 === 0 ? this.colors.white : this.colors.black;
        const square = new Square({x, y, size: this.squareSize, color, ctx: this.ctx});
        square.draw();
      }
    }
  }

  generatePieces() {
    this.ctx.font = '48px serif';
    this.board.forEach( (rank, x) => {
      rank.forEach( (piece, y) => {
        if (this.pieceTable.hasOwnProperty(piece.toLowerCase())) {
          this.ctx.fillStyle = piece === piece.toLowerCase() ? '#000' : '#fff';
          this.ctx.fillText(this.pieceTable[piece.toLowerCase()], y * this.squareSize + 10, x * this.squareSize + 50);
        }
      })
    })
  }
}
