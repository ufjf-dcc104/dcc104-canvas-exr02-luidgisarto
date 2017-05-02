function Sprite(x, y, w, h, cor) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.vx = 0;
  this.ax = 0;
  this.vy = 0;
  this.ay = 0;
  this.color = cor;
  this.energia = 300;
  this.cooldown = 0;
}

Sprite.prototype.desenhar = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

Sprite.prototype.mover = function (dt) {
  this.x += this.vx * dt;
  this.y += this.vy * dt;
  if (this.cooldown > 0) {
    this.cooldown -= dt;
  } else {
    this.cooldown = 0;
  }
};

Sprite.prototype.colidiu = function (alvo) {
  if (this.x + this.width < alvo.x)
    return false;
  if (this.x > alvo.x + this.width)
    return false;
  if (this.y + this.height < alvo.y)
    return false;
  if (this.y > alvo.y + this.height)
    return false;
  this.consumirEnergia();
  return true;
};

Sprite.prototype.consumirEnergia = function () {
  this.energia -= 3;
}
