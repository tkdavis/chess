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
    this.squareWidth = 70;
  }

  initialize() {
    this.generateBoard();
  }

  generateBoard() {
    this.board = board.fen.split('/').map((rank, i) => (
      rank.split('').map( square => ( !isNaN(square) ? '' : square ))
    ))

    this.generateBoardDisplay()
    this.generatePieces();
  }

  generateBoardDisplay() {
    ctx.clearRect(0, 0, 560, 560);
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let squareColor = (i+j) % 2 === 0 ? '#ddbc93' : '#955431';
        ctx.fillStyle = squareColor;
        ctx.fillRect(i*this.squareWidth, j*this.squareWidth, this.squareWidth, this.squareWidth);
      }
    }
  }

  generatePieces() {
    ctx.font = '48px serif';
    this.board.forEach( (rank, i) => {
      rank.forEach( (square, j) => {
        if (pieceTable.hasOwnProperty(square.toLowerCase())) {
          ctx.fillStyle = square === square.toLowerCase() ? '#000' : '#fff';
          ctx.fillText(pieceTable[square.toLowerCase()], j * this.squareWidth + 10, i * this.squareWidth + 50);
        }
      })
    })
  }
}

let board = new Board;
board.initialize();
// board.fen = "3k4/5ppp/2q5/3p2r1/8/1Q3P2/P4P1P/3R3K w - - 0 1";
// board.initialize();
