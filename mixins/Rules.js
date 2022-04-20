export default class Rules {
  constructor(draggablePiece, squares, pieces) {
    this.draggablePiece = draggablePiece;
    this.squares = squares;
    this.pieces = pieces;
  }

  checkDiagonals(draggablePiece, squares, pieces) {
    this.draggablePiece = draggablePiece;
    this.squares = squares;
    this.pieces = pieces;
    this.checkTopLeft();
    this.checkBottomLeft();
    this.checkTopRight();
    this.checkBottomRight();
  }
  
  checkTopLeft() {
    let piecePos = this.draggablePiece.previousPosition
    if (this.draggablePiece && this.draggablePiece.fenLetter.toLowerCase() === 'b') {
      for (let i = 1; piecePos.x - i >= 0 && piecePos.y - i >= 0; i++) {
        let pieceAtPosition = this.pieces[piecePos.y - i][piecePos.x - i]
        if (pieceAtPosition && this.draggablePiece.color === pieceAtPosition.color) {
          break;
        } else if (pieceAtPosition) {
          this.displayLegalMove(this.squares[piecePos.x - i][piecePos.y - i]);
          break;
        }
        this.displayLegalMove(this.squares[piecePos.x - i][piecePos.y - i]);
      }
    }
  }
  
  checkBottomLeft() {
    let piecePos = this.draggablePiece.previousPosition
    if (this.draggablePiece && this.draggablePiece.fenLetter.toLowerCase() === 'b') {
      for (let i = 1; piecePos.x - i >= 0 && piecePos.y + i <= 7; i++) {
        let pieceAtPosition = this.pieces[piecePos.y + i][piecePos.x - i]
        if (pieceAtPosition && this.draggablePiece.color === pieceAtPosition.color) {
          break;
        } else if (pieceAtPosition) {
          this.displayLegalMove(this.squares[piecePos.x - i][piecePos.y + i]);
          break;
        }
        this.displayLegalMove(this.squares[piecePos.x - i][piecePos.y + i]);
      }
    }
  }
  
  checkTopRight() {
    let piecePos = this.draggablePiece.previousPosition
    if (this.draggablePiece && this.draggablePiece.fenLetter.toLowerCase() === 'b') {
      for (let i = 1; piecePos.x + i <= 7 && piecePos.y - i >= 0; i++) {
        let pieceAtPosition = this.pieces[piecePos.y - i][piecePos.x + i]
        if (pieceAtPosition && this.draggablePiece.color === pieceAtPosition.color) {
          break;
        } else if (pieceAtPosition) {
          this.displayLegalMove(this.squares[piecePos.x + i][piecePos.y - i]);
          break;
        }
        this.displayLegalMove(this.squares[piecePos.x + i][piecePos.y - i]);
      }
    }
  }
  
  checkBottomRight() {
    let piecePos = this.draggablePiece.previousPosition
    if (this.draggablePiece && this.draggablePiece.fenLetter.toLowerCase() === 'b') {
      for (let i = 1; piecePos.x + i <= 7 && piecePos.y + i <= 7; i++) {
        let pieceAtPosition = this.pieces[piecePos.y + i][piecePos.x + i]
        if (pieceAtPosition && this.draggablePiece.color === pieceAtPosition.color) {
          break;
        } else if (pieceAtPosition) {
          this.displayLegalMove(this.squares[piecePos.x + i][piecePos.y + i]);
          break;
        }
        this.displayLegalMove(this.squares[piecePos.x + i][piecePos.y + i]);
      }
    }
  }

  displayLegalMove(square) {
    square.isLegalSquare = true;
    square.draw();
  }
}
