function Sprite(x, y, w, h, cor) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.vx = 0;
  this.ax = 0;
  this.vy = 0;
  this.ay = 0;
  this.angulo = 0;
  this.color = cor;
  this.energia = 300;
  this.cooldown = 0;
}

Sprite.prototype.desenhar = function (ctx, img) {
  // ctx.save();
  ctx.fillStyle = this.color;
  ctx.drawImage(img, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
  ctx.strokeStyle = "white";
  ctx.strokeRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);

  // ctx.translate(this.x, this.y);
  // ctx.rotate(this.angulo + Math.PI / 2);
  // ctx.beginPath();
  // ctx.closePath();
  // ctx.stroke();
  // ctx.fill();
  // ctx.restore();
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
