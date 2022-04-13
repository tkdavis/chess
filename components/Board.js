import Piece from './Piece.js';
import Square from './Square.js';

export default class Board {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    /*
    *  Uses FEN
    *  https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
    */
    this.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    // this.fen = "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"
    // this.fen = "3k4/5ppp/2q5/3p2r1/8/1Q3P2/P4P1P/3R3K w - - 0 1"
    this.board = [];
    this.pieces = [];
    this.draggablePiece;
    this.squareSize = 70;
    this.palettes = {
      brown: {white: '#ddbc93', black: '#955431'},
      green: {white: '#eeeed2', black: '#769655'}
    }
    this.colors = this.palettes.green;
    this.pieceTable = {
      k: '\u{265A}',
      q: '\u{265B}',
      r: '\u{265C}',
      b: '\u{265D}',
      n: '\u{265E}',
      p: '\u{265F}'
    }
    this.canvas.onmousedown = this.selectPieceToMove
    this.canvas.onmousemove = this.dragPiece
    this.canvas.onmouseup = this.dropPiece
  }

  initialize() {
    this.generateBoard();
  }

  generateBoard() {
    this.board = [];
    this.fen.split('/').forEach((rank, y) => {
      let newRank = [];
      rank.split('').forEach((square, x) => {
        if (x < 8) {
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
    this.pieces = [];
    this.ctx.font = '48px serif';
    this.board.forEach( (rank, y) => {
      let newRank = [];
      rank.forEach( (pieceFEN, x) => {
        if (pieceFEN === '') {
          newRank.push('');
        } else if (this.pieceTable.hasOwnProperty(pieceFEN.toLowerCase())) {
          let piece = new Piece({
            ctx: this.ctx,
            color: pieceFEN === pieceFEN.toLowerCase() ? 'black' : 'white',
            pieceType: this.pieceTable[pieceFEN.toLowerCase()],
            fenLetter: pieceFEN,
            x,
            y,
            squareSize: this.squareSize
          });
          piece.draw();

          newRank.push(piece);
        }
      })
      this.pieces.push(newRank);
    })
  }
  
  /* TODO: Breakout these drag and drop methods into seperate module. */
  selectPieceToMove = e => {
    let selectPosition = {x: Math.floor(e.offsetX / 70), y: Math.floor(e.offsetY / 70)};
    this.draggablePiece = this.pieces[selectPosition.y][selectPosition.x];
    this.draggablePiece.previousPosition.x = this.draggablePiece.x
    this.draggablePiece.previousPosition.y = this.draggablePiece.y
    this.board[this.draggablePiece.y][this.draggablePiece.x] = '';
    // TODO:
    // remove piece from FEN string and generate pieces (again)
  }

  dragPiece = e => {
    if (this.draggablePiece) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.draggablePiece.x = (e.offsetX / 70) - 0.5;
      this.draggablePiece.y = (e.offsetY / 70) - 0.5;
      this.generateSquares();
      this.draggablePiece.draw();
      this.generatePieces();
    }
  }

  dropPiece = e => {
    // TODO:
    // check if legal move
    if (this.draggablePiece) {
      this.draggablePiece.x = Math.round(this.draggablePiece.x);
      this.draggablePiece.y = Math.round(this.draggablePiece.y);
      this.board[this.draggablePiece.y][this.draggablePiece.x] = this.draggablePiece.fenLetter;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.generateSquares();
      this.generatePieces();
      this.draggablePiece = '';
    }
  }
}
