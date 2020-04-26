function Nave(context, teclado, imagem, imgExplosao, x, y) {
   this.context = context;
   this.teclado = teclado;
   this.imagem = imagem;
   this.x = x;
   this.y = y;
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
   this.posicaoCasa = 0;
}
Nave.prototype = {
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
         console.log('==== ok');// verificar se foi dado o click na nave

         let mouseClickPoint = {
            x: this.teclado.cliqueX,
            y: this.teclado.cliqueY 
         };
         
         console.log(mouseClickPoint.x + ' ' + mouseClickPoint.y);

         context.strokeRect(mouseClickPoint.x, mouseClickPoint.y, 30, 50);

         // se clique do mouse foi em cima da nave
         if (mouseClickPoint.y > this.y && mouseClickPoint.y < this.y + this.height && 
            mouseClickPoint.x > this.x && mouseClickPoint.x < this.x + this.width) {
            console.log('clicou em cima de mim!');
            this.posicionar();
            if (!this.iniciouJogo) {
               if (this.imagem.currentSrc.includes('pino-amarelo')) {
                  this.x = 250 - 22/2;
                  this.y = 500 - 40/2;
               } else if (this.imagem.currentSrc.includes('pino-azul')) {
                  this.x = 100 - 22/2;
                  this.y = 250 - 40/2;
               } else if (this.imagem.currentSrc.includes('pino-vermelho')) {
                  this.x = 350 - 22/2;
                  this.y = 100 - 40/2;
               } else if (this.imagem.currentSrc.includes('pino-verde')) {
                  this.x = 500 - 22/2;
                  this.y = 350 - 40/2;
               }
            }
            this.posicaoCasa++;
            
            this.iniciouJogo = true;
            
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
      this.animacao.novoSprite(t);
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
      
      // var ctx = this.context;
      
      // for (var i in rets) {
      //    ctx.save();
      //    ctx.strokeStyle = 'yellow';
      //    ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, 
      //                   rets[i].altura);
      //    ctx.restore();
      // }
      
      
      return rets;
   },
   colidiuCom: function(outro) {
      // Se colidiu com um Ovni...
      if (outro instanceof Ovni) {
         this.animacao.excluirSprite(this);
         this.animacao.excluirSprite(outro);
         this.colisor.excluirSprite(this);
         this.colisor.excluirSprite(outro);
         
         var exp1 = new Explosao(this.context, this.imgExplosao,
                                 this.x, this.y);
         var exp2 = new Explosao(this.context, this.imgExplosao,
                                 outro.x, outro.y);
         
         this.animacao.novoSprite(exp1);
         this.animacao.novoSprite(exp2);
         
         var nave = this;
         exp1.fimDaExplosao = function() {
            nave.vidasExtras--;
            
            if (nave.vidasExtras < 0) {
               if (nave.acabaramVidas) nave.acabaramVidas();
            }
            else {
               // Recolocar a nave no engine
               nave.colisor.novoSprite(nave);
               nave.animacao.novoSprite(nave);
               
               nave.posicionar();
            }
         }
      }
   },
   posicionar: function() {
      if (this.iniciouJogo) {
         if (this.imagem.currentSrc.includes('pino-amarelo')) {
            if (this.posicaoCasa < 4) {
               this.y = this.y - 50;
            } else if (this.posicaoCasa < 8) {
               this.x = this.x - 50;
            } else if (this.posicaoCasa < 10) {
               this.y = this.y - 50;
            } else if (this.posicaoCasa < 14) {
               this.x = this.x + 50;
            } else if (this.posicaoCasa < 18) {
               this.y = this.y - 50;
            } else if (this.posicaoCasa < 20) {
               this.x = this.x + 50;
            } else if (this.posicaoCasa < 24) {
               this.y = this.y + 50;
            } else if (this.posicaoCasa < 28) {
               this.x = this.x + 50;
            } else if (this.posicaoCasa < 30) {
               this.y = this.y + 50;
            } else if (this.posicaoCasa < 34) {
               this.x = this.x - 50;
            } else if (this.posicaoCasa < 38) {
               this.y = this.y + 50;
            } else if (this.posicaoCasa < 39) {
               this.x = this.x - 50;
            } else if (this.posicaoCasa < 43) {
               this.y = this.y - 50;
            } else {
               this.y = this.y - 50;
               alert('chegou amarelo!!!');
            }
         }

         if (this.imagem.currentSrc.includes('pino-azul')) {
            if (this.posicaoCasa < 4) {
               this.x = this.x + 50;
            } else if (this.posicaoCasa < 8) {
               this.y = this.y - 50;
            } else if (this.posicaoCasa < 10) {
               this.x = this.x + 50;
            } else if (this.posicaoCasa < 14) {
               this.y = this.y + 50;
            } else if (this.posicaoCasa < 18) {
               this.x = this.x + 50;
            } else if (this.posicaoCasa < 20) {
               this.y = this.y + 50;
            } else if (this.posicaoCasa < 24) {
               this.x = this.x - 50;
            } else if (this.posicaoCasa < 28) {
               this.y = this.y + 50;
            } else if (this.posicaoCasa < 30) {
               this.x = this.x - 50;
            } else if (this.posicaoCasa < 34) {
               this.y = this.y - 50;
            } else if (this.posicaoCasa < 38) {
               this.x = this.x - 50;
            } else if (this.posicaoCasa < 39) {
               this.y = this.y - 50;
            } else if (this.posicaoCasa < 43) {
               this.x = this.x + 50;
            } else {
               this.x = this.x + 50;
               alert('chegou azul!!!');
            }
         }

         if (this.imagem.currentSrc.includes('pino-vermelho')) {
            if (this.posicaoCasa < 4) {
               this.y = this.y + 50;
            } else if (this.posicaoCasa < 8) {
               this.x = this.x + 50;
            } else if (this.posicaoCasa < 10) {
               this.y = this.y + 50;
            } else if (this.posicaoCasa < 14) {
               this.x = this.x - 50;
            } else if (this.posicaoCasa < 18) {
               this.y = this.y + 50;
            } else if (this.posicaoCasa < 20) {
               this.x = this.x - 50;
            } else if (this.posicaoCasa < 24) {
               this.y = this.y - 50;
            } else if (this.posicaoCasa < 28) {
               this.x = this.x - 50;
            } else if (this.posicaoCasa < 30) {
               this.y = this.y - 50;
            } else if (this.posicaoCasa < 34) {
               this.x = this.x + 50;
            } else if (this.posicaoCasa < 38) {
               this.y = this.y - 50;
            } else if (this.posicaoCasa < 39) {
               this.x = this.x + 50;
            } else if (this.posicaoCasa < 43) {
               this.y = this.y + 50;
            } else {
               this.y = this.y + 50;
               alert('chegou vermelho!!!');
            }
         }

         if (this.imagem.currentSrc.includes('pino-verde')) {
            if (this.posicaoCasa < 4) {
               this.x = this.x - 50;
            } else if (this.posicaoCasa < 8) {
               this.y = this.y + 50;
            } else if (this.posicaoCasa < 10) {
               this.x = this.x - 50;
            } else if (this.posicaoCasa < 14) {
               this.y = this.y - 50;
            } else if (this.posicaoCasa < 18) {
               this.x = this.x - 50;
            } else if (this.posicaoCasa < 20) {
               this.y = this.y - 50;
            } else if (this.posicaoCasa < 24) {
               this.x = this.x + 50;
            } else if (this.posicaoCasa < 28) {
               this.y = this.y - 50;
            } else if (this.posicaoCasa < 30) {
               this.x = this.x + 50;
            } else if (this.posicaoCasa < 34) {
               this.y = this.y + 50;
            } else if (this.posicaoCasa < 38) {
               this.x = this.x + 50;
            } else if (this.posicaoCasa < 39) {
               this.y = this.y + 50;
            } else if (this.posicaoCasa < 43) {
               this.x = this.x - 50;
            } else {
               this.x = this.x - 50;
               alert('chegou verde!!!');
            }
         }
      }
   }
}
