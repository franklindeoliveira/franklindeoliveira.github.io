// Códigos de teclas - aqui vão todos os que forem necessários
var SETA_ESQUERDA = 37;
var SETA_ACIMA = 38;
var SETA_DIREITA = 39;
var SETA_ABAIXO = 40;
var ESPACO = 32;
var ENTER = 13;
var CLIQUE_MOUSE_ESQUERDO = 0;

function Teclado(elemento) {
   this.elemento = elemento;

   // Array de teclas pressionadas
   this.pressionadas = [];

   // Array de teclas disparadas
   this.disparadas = [];

   // Funções de disparo registradas
   this.funcoesDisparo = [];

   this.cliqueX = 0;
   this.cliqueY = 0;
   this.clicouMouseEsquerdoSobre = false;

   var teclado = this;

   elemento.addEventListener('keydown', function(evento) {
      var tecla = evento.keyCode;  // Tornando mais legível ;)
      teclado.pressionadas[tecla] = true;

      // Disparar somente se for o primeiro keydown da tecla
      if (teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]) {

          teclado.disparadas[tecla] = true;
          teclado.funcoesDisparo[tecla] () ;
      }
   });

   elemento.addEventListener('keyup', function(evento) {
      teclado.pressionadas[evento.keyCode] = false;
      teclado.disparadas[evento.keyCode] = false;
   });

   elemento.addEventListener('mousedown', function(e) {
      teclado.pressionadas[e.button] = true;
      teclado.cliqueX = e.pageX - this.offsetLeft;
      teclado.cliqueY = e.pageY - this.offsetTop;   
      console.log('mousedown');    
    });

   elemento.addEventListener('mouseup', function(e) {
      teclado.pressionadas[e.button] = false;
      console.log('mouseup');
   });

   elemento.addEventListener('click', function(e) {
      // teclado.pressionadas[e.button] = false;
      // console.log('c');
   });
}
Teclado.prototype = {
   pressionada: function(tecla) {
      return this.pressionadas[tecla];
   },
   disparou: function(tecla, callback) {
      this.funcoesDisparo[tecla] = callback;
   }
}
