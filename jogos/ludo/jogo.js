function Jogo(context) {
   this.context = context;
   this.sprites = [];
   this.ligado = false;
   this.processamentos = [];
   this.spritesExcluir = [];
   this.processamentosExcluir = [];
   this.ultimoCiclo = 0;
   this.decorrido = 0;
   this.jogadorAtual = 'pino-amarelo';
   this.dadoJogado = false;
   this.numeroSorteado = 0;
   this.vezProximoJogador = false;

   this.j1NumDentroCasa = 4;
   this.j2NumDentroCasa = 4;
   this.j3NumDentroCasa = 4;
   this.j4NumDentroCasa = 4;
}
Jogo.prototype = {
   novoSprite: function(sprite) {
      this.sprites.push(sprite);
      sprite.jogo = this;
   },
   ligar: function() {
      this.ultimoCiclo = 0;
      this.ligado = true;
      this.proximoFrame();
   },
   desligar: function() {
      this.ligado = false;
   },
   proximoFrame: function() {
      // Posso continuar?
      if ( ! this.ligado ) return;

      // this.proximoJogador();

      // console.log('jogador atual: ', this.jogadorAtual);
      
      var agora = new Date().getTime();
      if (this.ultimoCiclo == 0) this.ultimoCiclo = agora;
      this.decorrido = agora - this.ultimoCiclo;

      // Atualizamos o estado dos sprites
      for (var i in this.sprites)
         this.sprites[i].atualizar();

      // Desenhamos os sprites
      for (var i in this.sprites)
         this.sprites[i].desenhar();
         
      // Processamentos gerais
      for (var i in this.processamentos)
         this.processamentos[i].processar();
         
      // Processamento de exclusões
      this.processarExclusoes();
      
      // Atualizar o instante do último ciclo
      this.ultimoCiclo = agora;

      // Chamamos o próximo ciclo
      var jogo = this;
      requestAnimationFrame(function() {
         jogo.proximoFrame();
      });
   },
   novoProcessamento: function(processamento) {
      this.processamentos.push(processamento);
      processamento.jogo = this;
   },
   excluirSprite: function(sprite) {
      this.spritesExcluir.push(sprite);
   },
   excluirProcessamento: function(processamento) {
      this.processamentosExcluir.push(processamento);
   },
   processarExclusoes: function() {
      // Criar novos arrays
      var novoSprites = [];
      var novoProcessamentos = [];
      
      // Adicionar somente se não constar no array de excluídos
      for (var i in this.sprites) {
         if (this.spritesExcluir.indexOf(this.sprites[i]) == -1)
            novoSprites.push(this.sprites[i]);
      }
      
      for (var i in this.processamentos) {
         if (this.processamentosExcluir.indexOf(this.processamentos[i])
             == -1)
            novoProcessamentos.push(this.processamentos[i]);
      }
      
      // Limpar os arrays de exclusões
      this.spritesExcluir = [];
      this.processamentosExcluir = [];
      
      // Substituir os arrays velhos pelos novos
      this.sprites = novoSprites;
      this.processamentos = novoProcessamentos;
   },
   
   proximoJogador: function() {
      switch (this.jogadorAtual) {
         case 'pino-amarelo':
            this.jogadorAtual = 'pino-azul';
            break;
         case 'pino-azul':
            this.jogadorAtual = 'pino-vermelho';
            break;
         case 'pino-vermelho':
            this.jogadorAtual = 'pino-verde';
            break;
         case 'pino-verde':
            this.jogadorAtual = 'pino-amarelo';
            break;
         default:
            break;
      }
      document.getElementById('vez').textContent = this.jogadorAtual;
   },

   jogadorAnterior: function() {
      switch (this.jogadorAtual) {
         case 'pino-amarelo':
            return 'pino-verde';
         case 'pino-azul':
            return 'pino-amarelo';
         case 'pino-vermelho':
            return 'pino-azul';
         case 'pino-verde':
            return 'pino-vermelho';
         default:
      }
      document.getElementById('vez').textContent = this.jogadorAtual;
   },

   retiraPinoDaCasa: function() {
      switch (this.jogadorAtual) {
         case 'pino-amarelo':
            this.j1NumDentroCasa--;
            break;
         case 'pino-azul':
            this.j2NumDentroCasa--;
            break;
         case 'pino-vermelho':
            this.j3NumDentroCasa--;
            break;
         case 'pino-verde':
            this.j4NumDentroCasa--;
            break;
         default:
            break;
      }
   },

   colocaPinoNaCasa: function() {
      switch (this.jogadorAtual) {
         case 'pino-amarelo':
            this.j1NumDentroCasa++;
            break;
         case 'pino-azul':
            this.j2NumDentroCasa++;
            break;
         case 'pino-vermelho':
            this.j3NumDentroCasa++;
            break;
         case 'pino-verde':
            this.j4NumDentroCasa++;
            break;
         default:
            break;
      }
   },

   colocaPinoNaCasa: function(cor) {      
        if (cor.includes('pino-amarelo')) this.j1NumDentroCasa++;
        if (cor.includes('pino-azul')) this.j2NumDentroCasa++;
        if (cor.includes('pino-vermelho')) this.j3NumDentroCasa++;
        if (cor.includes('pino-verde')) this.j4NumDentroCasa++;      
   },

   numPinosCasaJogadorAtual: function() {
      switch (this.jogadorAtual) {
         case 'pino-amarelo':
            return this.j1NumDentroCasa;
            break;
         case 'pino-azul':
            return this.j2NumDentroCasa;
            break;
         case 'pino-vermelho':
            return this.j3NumDentroCasa;
            break;
         case 'pino-verde':
            return this.j4NumDentroCasa;
            break;
         default:
            return -1;
      }
   },

   posicionarInicial: function(pino) {

      if (pino.imagem.currentSrc.includes('pino-amarelo')) {

            // if (this.dentroCasa) {
               this.x = 250 - 22/2;
               this.y = 500 - 40/2;
            //    this.posicaoAtual = 1;
            //    this.dentroCasa = false;
            //    // this.jogo.numeroSorteado = 1;
            //    this.jogo.proximoJogador();
            //    this.jogo.dadoJogado = false;
            //    this.jogo.vezProximoJogador = false;
            //    return;
            // }
         
      if (pino.imagem.currentSrc.includes('pino-azul')) {
         // if (this.jogo.numeroSorteado == 6) {
         //    if (this.dentroCasa) {
               this.x = 100 - 22/2;
               this.y = 250 - 40/2;
               return; 
      }

      if (pino.imagem.currentSrc.includes('pino-vermelho')) {
         // if (this.jogo.numeroSorteado == 6) {
         //    if (this.dentroCasa) {
               this.x = 350 - 22/2;
               this.y = 100 - 40/2; 
            //    this.posicaoAtual = 1;
            //    this.dentroCasa = false;
            //    // this.jogo.numeroSorteado = 1;
            //    this.jogo.proximoJogador();
            //    this.jogo.dadoJogado = false;
            //    this.jogo.vezProximoJogador = false;
               return;
            // }
         }

      if (pino.imagem.currentSrc.includes('pino-verde')) {
         // if (this.jogo.numeroSorteado == 6) {
         //    if (this.dentroCasa) {
               this.x = 500 - 22/2;
               this.y = 350 - 40/2; 
            //    this.posicaoAtual = 1;
            //    this.dentroCasa = false;
            //    // this.jogo.numeroSorteado = 1;
            //    this.jogo.proximoJogador();
            //    this.jogo.dadoJogado = false;
            //    this.jogo.vezProximoJogador = false;
            //    return;
            // }
         }
      }
   // }
   }

}
