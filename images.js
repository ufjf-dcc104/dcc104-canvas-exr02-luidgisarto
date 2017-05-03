function ImageLoader(){
    this.images = {};
}

ImageLoader.prototype.load = function (key, imgURL) {
  var img = new Image();
  img.src = imgURL;
  this.images[key] = img;
};

ImageLoader.prototype.inicializar = function (){
    this.load("nave", "images/nave.png");
    this.load("inimigo", "images/inimigo.png");
    this.load("tiro", "images/tiro2.png");
}