function Sprite(x, y, w, h, cor){
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.vx = 0;
  this.ax = 0;
  this.color = cor;
  this.energia = 300;
}

Sprite.prototype.desenhar = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

Sprite.prototype.mover = function (dt) {
  this.vx = this.vx + this.ax * dt;
  this.x = this.x + this.vx * dt;
};
