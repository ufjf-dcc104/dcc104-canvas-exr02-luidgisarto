function Level() {
    this.inimigos = 10;
    this.sprites = [];
    this.tiros = [];
}

Level.prototype.inicializar = function () {
    for (var i = 0; i < this.inimigos; i++) {
        var inimigo = new Sprite();
        inimigo.x = 20 + parseInt(Math.floor(Math.random() * 450));
        inimigo.y = 20 + parseInt(Math.floor(Math.random() * 150));
        inimigo.angulo = -190;
        inimigo.vy = 200;
        inimigo.color = "red";
        inimigo.width = 50;
        inimigo.height = 50;
        inimigo.imgkey = "inimigo";
        this.sprites.push(inimigo);
    }
}

Level.prototype.desenhar = function (ctx) {
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].desenhar(ctx, this.imageLib.images[this.sprites[i].imgkey]);
        
    }

    for (var i = 0; i < this.tiros.length; i++) {
        this.tiros[i].desenhar(ctx, this.imageLib.images[this.tiros[i].imgkey]);
    }

}

Level.prototype.mover = function (dt) {
    for (var i = 0; i < this.sprites.length; i++) {
        var inimigo = this.sprites[i];
        if(parseInt(inimigo.y) > 500){
            this.sprites.splice(this.sprites.indexOf(inimigo), 1);
        }
        else{
            inimigo.mover(dt);
        }        
    }

    for (var i = 0; i < this.tiros.length; i++) {
        this.tiros[i].mover(dt);

    }
}

Level.prototype.atirar = function (alvo) {
    if (alvo.cooldown > 0)
        return;
    var tiro = new Sprite();
    tiro.x = alvo.x + 20;
    tiro.y = alvo.y;
    tiro.vy = -400;
    tiro.width = 10;
    tiro.height = 15;
    tiro.color = "orange";
    tiro.imgkey = "tiro";
    this.tiros.push(tiro);
    alvo.cooldown = 0;
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
