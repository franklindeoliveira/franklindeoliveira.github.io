function Dado(context, teclado, imagem) {
   this.context = context;
   this.teclado = teclado;
   this.imagem = imagem;
   this.x = 150;
   this.y = 525;
   this.width = imagem.width;
   this.height = imagem.height;
   this.spritesheet = new Spritesheet(context, imagem, 1, 1);
   this.spritesheet.linha = 0;
   this.spritesheet.intervalo = 100;
   // this.jogado = false;
   // this.numeroSorteado = 0;
   
}
Dado.prototype = {
   atualizar: function() {
      var incremento = 10;

      if (this.teclado.pressionada(CLIQUE_MOUSE_ESQUERDO) && !this.jogo.dadoJogado) {
         // console.log('==== ok');// verificar se foi dado o click no dado
         //this.teclado.pressionadas[CLIQUE_MOUSE_ESQUERDO] = false;

         // this.jogo.dadoJogado = true;

         let mouseClickPoint = {
            x: this.teclado.cliqueX,
            y: this.teclado.cliqueY 
         };
         
         // console.log(mouseClickPoint.x + ' ' + mouseClickPoint.y);

         context.strokeRect(mouseClickPoint.x, mouseClickPoint.y, 30, 50);

         // se clique do mouse foi em cima do dado
         if (mouseClickPoint.y > this.y && mouseClickPoint.y < this.y + this.height && 
            mouseClickPoint.x > this.x && mouseClickPoint.x < this.x + this.width) {
            // console.log('clicou em cima do dado!');
            this.jogo.dadoJogado = true;
            
            let min = 5, max = 7;
            //  = Math.floor(Math.random() * (max - min) + min);
            // this.jogo.numeroSorteado = 3;

            console.log('num sorteado: ' + this.jogo.numeroSorteado);
            console.log('tds em casa? ' + this.jogo.numPinosCasaJogadorAtual());

            document.getElementById('sorteado').textContent = this.jogo.numeroSorteado;

            if (this.jogo.numeroSorteado < 6) {
               if (this.jogo.numPinosCasaJogadorAtual() == 4) {
                  this.jogo.proximoJogador();
                  this.jogo.dadoJogado = false;
               } 
               else {
                  this.jogo.vezProximoJogador = true;
               }
            } else {
               // if (this.jogo.numPinosCasaJogadorAtual() < 4) {
                  this.jogo.vezProximoJogador = true;
               // }
            }
         }
         this.posicionar();
      }
      
   },
   desenhar: function() {
      this.spritesheet.desenhar(this.x, this.y);
      this.spritesheet.proximoQuadro();
   },

   posicionar: function() {
      switch (this.jogo.jogadorAtual) {
         case 'pino-amarelo':
            this.x = 150;
            this.y = 525;
            break;
         case 'pino-azul':
            this.x = 150;
            this.y = 25;
            break;
         case 'pino-vermelho':
            this.x = 150 + 250;
            this.y = 25;
            break;
         case 'pino-verde':
            this.x = 150 + 250;
            this.y = 525;
            break;
         default:
            break;
      }
   }
}
