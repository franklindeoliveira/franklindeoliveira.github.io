function Pino(context, teclado, imagem, imgExplosao, x, y) {
   this.context = context;
   this.teclado = teclado;
   this.imagem = imagem;
   this.x = x;
   this.y = y;
   this.xInicial = x;
   this.yInicial = y;
   this.width = imagem.width;
   this.height = imagem.height;
   this.velocidade = 0;
   this.spritesheet = new Spritesheet(context, imagem, 1, 1);
   this.spritesheet.linha = 0;
   this.spritesheet.intervalo = 100;
   this.imgExplosao = imgExplosao;
   this.acabaramVidas = null;
   this.vidasExtras = 3;
   this.iniciouJogo = false;
   this.posicaoAtual = 0;
   this.dentroCasa = true;
}
Pino.prototype = {
   atualizar: function() {
      var incremento = 10;
      
      if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0)
         this.x -= incremento;
         
      if (this.teclado.pressionada(SETA_DIREITA) && 
               this.x < this.context.canvas.width - 36)
         this.x += incremento;
         
      if (this.teclado.pressionada(SETA_ACIMA) && this.y > 0)
         this.y -= incremento;
         
      if (this.teclado.pressionada(SETA_ABAIXO) &&
               this.y < this.context.canvas.height - 48)
         this.y += incremento;

      if (this.teclado.pressionada(CLIQUE_MOUSE_ESQUERDO)) {
         // console.log('clici no pino');// verificar se foi dado o click na nave

         let mouseClickPoint = {
            x: this.teclado.cliqueX,
            y: this.teclado.cliqueY 
         };
         
         context.save();
         context.strokeStyle = 'yellow';
         context.strokeRect(mouseClickPoint.x, mouseClickPoint.y, 30, 50);
         context.restore();

         // se clique do mouse foi em cima do pino
         if ((mouseClickPoint.y > this.y && mouseClickPoint.y < this.y + this.height && 
            mouseClickPoint.x > this.x && mouseClickPoint.x < this.x + this.width)
            && this.jogo.dadoJogado
            && this.imagem.currentSrc.includes(this.jogo.jogadorAtual)) {
            console.log('clici no pino');// verificar se foi dado o click na nave
            if (this.jogo.numeroSorteado < 6 && this.dentroCasa) {
               return;
            }
            
            this.jogo.retiraPinoDaCasa();
            this.posicionar();

            if (this.jogo.vezProximoJogador) {
               this.jogo.proximoJogador();
               this.jogo.dadoJogado = false;
               this.jogo.vezProximoJogador = false;
            } 
         }
      }
   },
   desenhar: function() {
      if (this.teclado.pressionada(SETA_ESQUERDA))
         this.spritesheet.linha = 0;
      else if (this.teclado.pressionada(SETA_DIREITA))
         this.spritesheet.linha = 0;
      else
         this.spritesheet.linha = 0;      
      
      this.spritesheet.desenhar(this.x, this.y);
      this.spritesheet.proximoQuadro();
   },
   atirar: function() {
      var t = new Tiro(this.context, this);
      this.jogo.novoSprite(t);
      this.colisor.novoSprite(t);
   },
   retangulosColisao: function() {
      // Estes valores vão sendo ajustados aos poucos
      var rets = 
      [ 
         {x: this.x+2, y: this.y+19, largura: 9, altura: 13},
         {x: this.x+13, y: this.y+3, largura: 10, altura: 33},
         {x: this.x+25, y: this.y+19, largura: 9, altura: 13}
      ];
      
      // Desenhando os retângulos para visualização
      
      var ctx = this.context;
      
      for (var i in rets) {
         ctx.save();
         ctx.strokeStyle = 'yellow';
         ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, 
                        rets[i].altura);
         ctx.restore();
      }
      
      
      return rets;
   },
   colidiuCom: function(outro) {
      // Se colidiu com outro Pino...
      if (outro instanceof Pino) {
         // Se Pino nao eh do mesmo jogador (mesma cor)...
         if (this.imagem.currentSrc != outro.imagem.currentSrc) {
            // posiciona o pino
            if (this.imagem.currentSrc.includes(this.jogo.jogadorAnterior())) {
                  
               console.log(outro.imagem.currentSrc);
               console.log('volta pra casa!');
               outro.posicionarNaCasa();
            } else {
               console.log(outro.imagem.currentSrc);
               console.log('volta pra casa!');
               this.posicionarNaCasa();
            }
         }
      }
   },
   posicionarNaCasa: function() {
      this.x = this.xInicial;
      this.y = this.yInicial;
   },
   posicionar: function() {

         let andarCasas = this.jogo.numeroSorteado;

         if (this.imagem.currentSrc.includes('pino-amarelo')) {

            if (this.jogo.numeroSorteado == 6) {
               if (this.dentroCasa) {
                  this.x = 250 - 22/2;
                  this.y = 500 - 40/2;
                  this.posicaoAtual = 1;
                  this.dentroCasa = false;
                  // this.jogo.numeroSorteado = 1;
                  this.jogo.proximoJogador();
                  this.jogo.dadoJogado = false;
                  this.jogo.vezProximoJogador = false;
                  return;
               }
            }

            for (var i = 0; i < andarCasas ; i++) {
               if (this.posicaoAtual < 4) {
                  this.y = this.y - 50;
               } else if (this.posicaoAtual < 8) {
                  this.x = this.x - 50;;
                  // this.x += 50 +  this.jogo.numeroSorteado;
               } else if (this.posicaoAtual < 10) {
                  this.y = this.y - 50;;
                  // this.y += 50 +  this.jogo.numeroSorteado;
               } else if (this.posicaoAtual < 14) {
                  this.x = this.x + 50;;
                  // this.x += 50 +  this.jogo.numeroSorteado;
               } else if (this.posicaoAtual < 18) {
                  this.y = this.y - 50;;
                  // this.y += 50 +  this.jogo.numeroSorteado;
               } else if (this.posicaoAtual < 20) {
                  this.x = this.x + 50;;
                  // this.x += 50 +  this.jogo.numeroSorteado;
               } else if (this.posicaoAtual < 24) {
                  this.y = this.y + 50;;
                  // this.y += 50 +  this.jogo.numeroSorteado;
               } else if (this.posicaoAtual < 28) {
                  this.x = this.x + 50;;
                  // this.x += 50 +  this.jogo.numeroSorteado;
               } else if (this.posicaoAtual < 30) {
                  this.y = this.y + 50;;
                  // this.y += 50 +  this.jogo.numeroSorteado;
               } else if (this.posicaoAtual < 34) {
                  this.x = this.x - 50;;
                  // this.x += 50 +  this.jogo.numeroSorteado;
               } else if (this.posicaoAtual < 38) {
                  this.y = this.y + 50;;
                  // this.y += 50 +  this.jogo.numeroSorteado;
               } else if (this.posicaoAtual < 39) {
                  this.x = this.x - 50;;
                  // this.x += 50 +  this.jogo.numeroSorteado;
               } else if (this.posicaoAtual < 43) {
                  this.y = this.y - 50;;
                  // this.y += 50 +  this.jogo.numeroSorteado;
               } else {
                  this.y = this.y - 50;;
                  // this.y += 50 +  this.jogo.numeroSorteado;
                  alert('chegou amarelo!!!');
               }
               this.posicaoAtual++;
            }
         }

         if (this.imagem.currentSrc.includes('pino-azul')) {
            if (this.jogo.numeroSorteado == 6) {
               if (this.dentroCasa) {
                  this.x = 100 - 22/2;
                  this.y = 250 - 40/2; 
                  this.posicaoAtual = 1;
                  this.dentroCasa = false;
                  // this.jogo.numeroSorteado = 1;
                  this.jogo.proximoJogador();
                  this.jogo.dadoJogado = false;
                  this.jogo.vezProximoJogador = false;
                  return;
               }
            }
            for (var i = 0; i < this.jogo.numeroSorteado; i++) {
               if (this.posicaoAtual < 4) {
                  this.x = this.x + 50;
               } else if (this.posicaoAtual < 8) {
                  this.y = this.y - 50;
               } else if (this.posicaoAtual < 10) {
                  this.x = this.x + 50;
               } else if (this.posicaoAtual < 14) {
                  this.y = this.y + 50;
               } else if (this.posicaoAtual < 18) {
                  this.x = this.x + 50;
               } else if (this.posicaoAtual < 20) {
                  this.y = this.y + 50;
               } else if (this.posicaoAtual < 24) {
                  this.x = this.x - 50;
               } else if (this.posicaoAtual < 28) {
                  this.y = this.y + 50;
               } else if (this.posicaoAtual < 30) {
                  this.x = this.x - 50;
               } else if (this.posicaoAtual < 34) {
                  this.y = this.y - 50;
               } else if (this.posicaoAtual < 38) {
                  this.x = this.x - 50;
               } else if (this.posicaoAtual < 39) {
                  this.y = this.y - 50;
               } else if (this.posicaoAtual < 43) {
                  this.x = this.x + 50;
               } else {
                  this.x = this.x + 50;
                  alert('chegou azul!!!');
               }
               this.posicaoAtual++;
            }
         }

         if (this.imagem.currentSrc.includes('pino-vermelho')) {
            if (this.jogo.numeroSorteado == 6) {
               if (this.dentroCasa) {
                  this.x = 350 - 22/2;
                  this.y = 100 - 40/2; 
                  this.posicaoAtual = 1;
                  this.dentroCasa = false;
                  // this.jogo.numeroSorteado = 1;
                  this.jogo.proximoJogador();
                  this.jogo.dadoJogado = false;
                  this.jogo.vezProximoJogador = false;
                  return;
               }
            }
            for (var i = 0; i < this.jogo.numeroSorteado; i++) {
               if (this.posicaoAtual < 4) {
                  this.y = this.y + 50;
               } else if (this.posicaoAtual < 8) {
                  this.x = this.x + 50;
               } else if (this.posicaoAtual < 10) {
                  this.y = this.y + 50;
               } else if (this.posicaoAtual < 14) {
                  this.x = this.x - 50;
               } else if (this.posicaoAtual < 18) {
                  this.y = this.y + 50;
               } else if (this.posicaoAtual < 20) {
                  this.x = this.x - 50;
               } else if (this.posicaoAtual < 24) {
                  this.y = this.y - 50;
               } else if (this.posicaoAtual < 28) {
                  this.x = this.x - 50;
               } else if (this.posicaoAtual < 30) {
                  this.y = this.y - 50;
               } else if (this.posicaoAtual < 34) {
                  this.x = this.x + 50;
               } else if (this.posicaoAtual < 38) {
                  this.y = this.y - 50;
               } else if (this.posicaoAtual < 39) {
                  this.x = this.x + 50;
               } else if (this.posicaoAtual < 43) {
                  this.y = this.y + 50;
               } else {
                  this.y = this.y + 50;
                  alert('chegou vermelho!!!');
               }
               this.posicaoAtual++;
            }
         }

         if (this.imagem.currentSrc.includes('pino-verde')) {
            if (this.jogo.numeroSorteado == 6) {
               if (this.dentroCasa) {
                  this.x = 500 - 22/2;
                  this.y = 350 - 40/2; 
                  this.posicaoAtual = 1;
                  this.dentroCasa = false;
                  // this.jogo.numeroSorteado = 1;
                  this.jogo.proximoJogador();
                  this.jogo.dadoJogado = false;
                  this.jogo.vezProximoJogador = false;
                  return;
               }
            }
            for (var i = 0; i < this.jogo.numeroSorteado; i++) {
               if (this.posicaoAtual < 4) {
                  this.x = this.x - 50;
               } else if (this.posicaoAtual < 8) {
                  this.y = this.y + 50;
               } else if (this.posicaoAtual < 10) {
                  this.x = this.x - 50;
               } else if (this.posicaoAtual < 14) {
                  this.y = this.y - 50;
               } else if (this.posicaoAtual < 18) {
                  this.x = this.x - 50;
               } else if (this.posicaoAtual < 20) {
                  this.y = this.y - 50;
               } else if (this.posicaoAtual < 24) {
                  this.x = this.x + 50;
               } else if (this.posicaoAtual < 28) {
                  this.y = this.y - 50;
               } else if (this.posicaoAtual < 30) {
                  this.x = this.x + 50;
               } else if (this.posicaoAtual < 34) {
                  this.y = this.y + 50;
               } else if (this.posicaoAtual < 38) {
                  this.x = this.x + 50;
               } else if (this.posicaoAtual < 39) {
                  this.y = this.y + 50;
               } else if (this.posicaoAtual < 43) {
                  this.x = this.x - 50;
               } else {
                  this.x = this.x - 50;
                  alert('chegou verde!!!');
               }
               this.posicaoAtual++;
            }
         }
      // }
   }
   
}
