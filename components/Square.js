export default class Square {
  constructor({x, y, size, color, ctx}) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
  }
}
