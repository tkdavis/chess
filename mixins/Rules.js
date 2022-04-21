export default class Rules {

  checkDiagonals = function() {
    this.checkTopLeft();
    this.checkBottomLeft();
    this.checkTopRight();
    this.checkBottomRight();
  }
  
  checkTopLeft = function() {
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
  
  checkBottomLeft = function() {
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
  
  checkTopRight = function() {
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
  
  checkBottomRight = function() {
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

  displayLegalMove = function(square) {
    square.isLegalSquare = true;
    square.draw();
  }
}
