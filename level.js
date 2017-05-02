function Level() {
    this.inimigos = 6;
    this.sprites = [];
    this.tiros = [];
}

Level.prototype.inicializar = function () {
    for (var i = 0; i < this.inimigos; i++) {
        var inimigo = new Sprite();
        inimigo.x = 100 * i;
        inimigo.y = 10;
        inimigo.vy = 100;
        inimigo.color = "red";
        inimigo.width = 32;
        inimigo.height = 32;
        this.sprites.push(inimigo);
    }
}

Level.prototype.desenhar = function (ctx) {
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].desenhar(ctx);
    }

    for (var i = 0; i < this.tiros.length; i++) {
        this.tiros[i].desenhar(ctx);
    }

}

Level.prototype.mover = function (dt) {
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].mover(dt);
    }

    for (var i = 0; i < this.tiros.length; i++) {
        this.tiros[i].mover(dt);

    }
}

Level.prototype.atirar = function (alvo) {
    if (alvo.cooldown > 0)
        return;
    var tiro = new Sprite();
    tiro.x = alvo.x + 10;
    tiro.y = alvo.y;
    tiro.vy = -100;
    tiro.width = 8;
    tiro.height = 16;
    tiro.color = "orange";
    this.tiros.push(tiro);
    alvo.cooldown = 1;
}

Level.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i].colidiu(alvo)){
        resolveColisao(this.sprites[i], alvo);
      }
    }
};

Level.prototype.atingido = function () {
    for (var i = this.tiros.length - 1; i >= 0; i--) {
        this.colidiuCom(this.tiros[i],
            (
                function (that) {
                    return function (alvo) {
                        alvo.color = "green";
                        that.tiros.splice(i, 1);
                        x = that.sprites.indexOf(alvo);
                        that.sprites.splice(x, 1);
                    }
                }
            )(this));
    }
}
