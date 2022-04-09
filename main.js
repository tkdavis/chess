/*
*  Uses FEN
*  https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
*/

let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");

let pieceTable = {
  k: '\u{265A}',
  q: '\u{265B}',
  r: '\u{265C}',
  b: '\u{265D}',
  n: '\u{265E}',
  p: '\u{265F}',
}

class Board {
  constructor() {
    this.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    // this.fen = "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"
    // this.fen = "3k4/5ppp/2q5/3p2r1/8/1Q3P2/P4P1P/3R3K w - - 0 1"
    this.board = [];
    this.squareSize = 70;
    this.colors = {white: '#ddbc93', black: '#955431'}
  }

  initialize() {
    this.generateBoard();
  }

  generateBoard() {
    this.board = board.fen.split('/').map((rank, i) => (
      rank.split('').map( square => ( !isNaN(square) ? '' : square ))
    ))

    this.generateSquares();
    this.generatePieces();
  }

  generateSquares() {
    ctx.clearRect(0, 0, 560, 560);
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        let color = (x + y) % 2 === 0 ? this.colors.white : this.colors.black;
        const square = new Square({x, y, size: this.squareSize, color});
        square.draw();
      }
    }
  }

  generatePieces() {
    ctx.font = '48px serif';
    this.board.forEach( (rank, x) => {
      rank.forEach( (piece, y) => {
        if (pieceTable.hasOwnProperty(piece.toLowerCase())) {
          ctx.fillStyle = piece === piece.toLowerCase() ? '#000' : '#fff';
          ctx.fillText(pieceTable[piece.toLowerCase()], y * this.squareSize + 10, x * this.squareSize + 50);
        }
      })
    })
  }
}

class Square {
  constructor({x, y, size, color}) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
  }
}

let board = new Board;
board.initialize();
