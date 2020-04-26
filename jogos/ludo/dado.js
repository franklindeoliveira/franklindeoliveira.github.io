function Dado(context, teclado, imagem) {
   this.context = context;
   this.teclado = teclado;
   this.imagem = imagem;
   this.x = 150;
   this.y = 525;
   this.spritesheet = new Spritesheet(context, imagem, 1, 1);
   this.spritesheet.linha = 0;
   this.spritesheet.intervalo = 100;
}
Dado.prototype = {
   atualizar: function() {
      
   },
   desenhar: function() {
      this.spritesheet.desenhar(this.x, this.y);
      //this.spritesheet.proximoQuadro();
   }
}
