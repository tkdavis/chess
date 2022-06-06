export default class Rules {
  checkDirectionBounds = function(direction, piecePos, counter) {
    let directionBounds = {
      left: piecePos.x - counter >= 0,
      right: piecePos.x + counter <= 7,
      down: piecePos.y + counter <= 7,
      up: piecePos.y - counter >= 0,
      bottomRight:  piecePos.x + counter <= 7 && piecePos.y + counter <= 7,
      topRight: piecePos.x + counter <= 7 && piecePos.y - counter >= 0,
      bottomLeft: piecePos.x - counter >= 0 && piecePos.y + counter <= 7,
      topLeft: piecePos.x - counter >= 0 && piecePos.y - counter >= 0,
      upTwo: piecePos.y - counter >= 4,
      downTwo: piecePos.y + counter <= 3,
      upOne: counter === 1,
      downOne: counter === 1,
      topRightOne: counter === 1,
      topLeftOne: counter === 1
    }

    return directionBounds[direction];
  }

  checkDiagonals = function() {
    this.checkDirection('topLeft', 'both', -1, -1);
    this.checkDirection('bottomLeft', 'both', -1);
    this.checkDirection('topRight', 'both', 1, -1);
    this.checkDirection('bottomRight', 'both'); 
  }

  checkVertical = function() {
    this.checkDirection('up', 'y', 1, -1);
    this.checkDirection('down', 'y');
  }
  
  checkHorizontal = function() {
    this.checkDirection('left', 'x', -1);
    this.checkDirection('right', 'x');
  }

  checkForwardPawn = function() {
    if (this.draggablePiece.color === 'white') {
      this.checkDirection('upTwo', 'y', 1, -1);
      this.checkDirection('upOne', 'y', 1, -1);
    } else {
      this.checkDirection('downTwo', 'y');
      this.checkDirection('downOne', 'y');
    }
  }

  checkPawnDiagonals = function() {
    if (this.draggablePiece.color === 'white') {
      this.checkDirection('topRightOne', 'both', 1, -1);
      this.checkDirection('topLeftOne', 'both', -1, -1);
    }
  }

  checkDirection = function(direction, axis, xSign = 1, ySign = 1) {
    let piecePos = this.draggablePiece.previousPosition;
    if (this.draggablePiece) {
      for (let i = 1; this.checkDirectionBounds(direction, piecePos, i); i++) {
        let squaresByAxis = {
          x: this.squares[piecePos.x + i * xSign][piecePos.y],
          y: this.squares[piecePos.x][piecePos.y + i * ySign],
          both: this.squares[piecePos.x + i * xSign][piecePos.y + i * ySign]
        }

        let pieceByAxis;
        if (axis === 'x') {
          pieceByAxis = this.pieces[piecePos.y][piecePos.x + i * xSign];
        } else if (axis === 'y') {
          pieceByAxis = this.pieces[piecePos.y + i * ySign][piecePos.x];
        } else if (axis === 'both') {
          pieceByAxis = this.pieces[piecePos.y + i * ySign][piecePos.x + i * xSign];
        }

        if (pieceByAxis && this.draggablePiece.color === pieceByAxis.color) {
          break;
        } else if (pieceByAxis) {
          this.displayLegalMove(squaresByAxis[axis]);
          break;
        } else if (!pieceByAxis && direction === 'topRightOne' || direction === 'topLeftOne') {
          break;
        }
        this.displayLegalMove(squaresByAxis[axis]);
      }
    }
  }

  displayLegalMove = function(square) {
    square.isLegalSquare = true;
    square.draw();
  }
}
