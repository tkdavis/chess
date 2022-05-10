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
    // this.fen = "1kkkkk2/3Q4/8/8/8/1Q3P2/P4P1P/3R3K w - - 0 1"
    this.board = [];
    this.pieces = [];
    this.squares = [];
    this.draggablePiece;
    this.squareSize = 70;
    this.palettes = {
      brown: {white: '#ddbc93', black: '#955431'},
      green: {white: '#eeeed2', black: '#769655'},
      grey: {white: '#e7eaef', black: '#7b8697'}
    }
    this.colors = this.palettes.grey;
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
    this.board = this.fen.split('/').map((rank, y) => {
      let newRank = [];
      rank.split('').forEach((square, x) => {
        if (x < 8) {
          if (!isNaN(square)) {
            for(let i = 0; i < square; i++) {
              newRank.push('');
            }
            return;
          }
          newRank.push(square);
        }
      });
      return newRank;
    })
    this.draw();
  }

  generateSquares() {
    for (let x = 0; x < 8; x++) {
      let rank = [];
      for (let y = 0; y < 8; y++) {
        let color = (x + y) % 2 === 0 ? this.colors.white : this.colors.black;
        const square = new Square({x, y, size: this.squareSize, color, ctx: this.ctx});
        rank.push(square);
        square.draw();
      }
      this.squares.push(rank);
    }
  }

  generatePieces() {
    this.ctx.font = '48px serif';
    this.pieces = this.board.map( (rank, y) => {
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
      return newRank;
    })
  }

  resetLegalSquares() {
    this.squares.forEach(rank => {
      rank.forEach(square => {
        square.isLegalSquare = false;
      })
    })
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.generateSquares();
    this.generatePieces();
    if (this.draggablePiece) {
      this.draggablePiece.draw();
    }
  }

  selectPieceToMove = e => {
    let selectPosition = {x: Math.floor(e.offsetX / 70), y: Math.floor(e.offsetY / 70)};
    this.draggablePiece = this.pieces[selectPosition.y][selectPosition.x];
    this.draggablePiece.previousPosition.x = this.draggablePiece.x
    this.draggablePiece.previousPosition.y = this.draggablePiece.y
    this.board[this.draggablePiece.y][this.draggablePiece.x] = '';
  }

  dragPiece = e => {
    let pieceType = this.draggablePiece.fenLetter.toLowerCase();
    if (this.draggablePiece) {
      this.draggablePiece.x = (e.offsetX / 70) - 0.5;
      this.draggablePiece.y = (e.offsetY / 70) - 0.5;
      this.draw();
      if (pieceType === 'b') {
        this.checkDiagonals();
      } else if (pieceType === 'q') {
        this.checkHorizontal();
        this.checkVertical();
        this.checkDiagonals();
      } else if (pieceType === 'r') {
        this.checkHorizontal();
        this.checkVertical();
      } else if (pieceType === 'p') {
        this.checkForwardPawn();
        this.checkPawnDiagonals();
      }
    }
  }

  dropPiece = e => {
    const dropX = Math.round(this.draggablePiece.x);
    const dropY = Math.round(this.draggablePiece.y);
    const prevX = this.draggablePiece.previousPosition.x;
    const prevY = this.draggablePiece.previousPosition.y;
    let square = this.squares[dropX][dropY];
    if (square.isLegalSquare) {
      this.draggablePiece.x = dropX;
      this.draggablePiece.y = dropY;
      this.board[this.draggablePiece.y][this.draggablePiece.x] = this.draggablePiece.fenLetter;
    } else {
      this.board[prevY][prevX] = this.draggablePiece.fenLetter;
    }
    this.draggablePiece = '';
    this.draw();
    this.resetLegalSquares();
  }
}
