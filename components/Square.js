export default class Square {
  constructor({x, y, size, color, ctx}) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.ctx = ctx;
    this.isLegalSquare = false;
  }

  draw() {
    if (this.isLegalSquare) {
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = '#4fc582';
      this.ctx.strokeRect(this.x * this.size, this.y * this.size, this.size, this.size);
      this.ctx.fillStyle = '#4fc58250';
      this.ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    } else {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
  }
}
