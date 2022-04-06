/*
rank / file

FEN Forsyth-Edwards Notation
A FEN record contains six fields. The separator between fields is a space. The fields are:

1. Piece placement (from White's perspective). Each rank is described, starting with rank 8 and ending with rank 1;
within each rank, the contents of each square are described from file "a" through file "h".
Following the Standard Algebraic Notation (SAN), each piece is identified by a single letter taken
from the standard English names (pawn = "P", knight = "N", bishop = "B", rook = "R", queen = "Q" and king = "K").
White pieces are designated using upper-case letters ("PNBRQK") while black pieces use lowercase ("pnbrqk").
Empty squares are noted using digits 1 through 8 (the number of empty squares), and "/" separates ranks.

2. Active color. "w" means White moves next, "b" means Black moves next.

3. Castling availability. If neither side can castle, this is "-". Otherwise, this has one or more letters: "K" (White can castle kingside), "Q" (White can castle queenside), "k" (Black can castle kingside), and/or "q" (Black can castle queenside). A move that temporarily prevents castling does not negate this notation.

4. En passant target square in algebraic notation. If there's no en passant target square, this is "-". If a pawn has just made a two-square move, this is the position "behind" the pawn. This is recorded regardless of whether there is a pawn in position to make an en passant capture.

5. Halfmove clock: The number of halfmoves since the last capture or pawn advance, used for the fifty-move rule.

6. Fullmove number: The number of the full move. It starts at 1, and is incremented after Black's move.
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
    console.log(this.board);
  }

  generateBoard() {
    this.fen.split('/').forEach((rank, i) => {
      let newRank = [];
      rank.split('').forEach((square, j) => {
        if (j < 8) {
          if (!isNaN(square)) {
            for(let k = 0; k < square; k++) {
              newRank.push('');
            }
            return;
          }
          newRank.push(square);
        }
      });
      this.board.push(newRank);
    })
    this.generateBoardDisplay()
    this.generatePieces();
  }

  generateBoardDisplay() {
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
