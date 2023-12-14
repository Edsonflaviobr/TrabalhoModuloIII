const readlineSync = require('readline-sync');

class Jogador {
  constructor(nome) {
    this.nome = nome;
  }
}

class Controlador {
  constructor() {
    this.jogador = [];
    this.partidaAtual = null;
  }

  criarPartida(palavra,dica) {
    this.partidaAtual = new Partida(palavra,dica);
  }

  adicionarJogador(nome) {
    const jogador = new Jogador(nome);
    this.jogador.push(jogador);
    return jogador;
  }

  realizarJogada(jogador, tentativa) {
    if (this.partidaAtual) {
      this.partidaAtual.realizarJogada(tentativa);
    } else {
      console.log("Crie uma nova partida antes de realizar jogadas.");
    }
  }

  reiniciarPartida() {
    if (this.partidaAtual) {
      this.partidaAtual.reiniciar();
      console.log("Nova partida iniciada!");
    } else {
      console.log("Não há partida para reiniciar. Crie uma nova partida.");
    }
  }

  encerrarJogo() {
    console.log("Fim do jogo!");
    process.exit();
  }
}


class Partida extends Controlador {
  constructor(palavra, dica) {
    super ();
    this.palavraOriginal = palavra.toUpperCase();
    this.palavraSecreta = "_".repeat(this.palavraOriginal.length);
    this.contadorTentativas = 7;
    this.letrasTentadas = new Set();
    this.dica = dica;
    this.jogador = [];
  }

  adicionarJogador(jogador) {
    this.jogador.push(jogador);
  }


  realizarJogada(letraOuPalavra) {
    letraOuPalavra = letraOuPalavra.toUpperCase();

    if (letraOuPalavra.length === 1 && letraOuPalavra.match(/[A-Za-zÀ-ÖØ-öø-ÿç]/)) {
      this.tentarComLetra(letraOuPalavra);
    } else if (letraOuPalavra.length === this.palavraOriginal.length && letraOuPalavra.match(/[A-Za-zÀ-ÖØ-öø-ÿç]/)) {
      this.tentarComPalavra(letraOuPalavra);
    } else {
      console.log("Opção inválida. Tente novamente.");
    }
  }

  tentarComLetra(letra) {
    this.letrasTentadas.add(letra);

    if (this.palavraOriginal.includes(letra)) {
      this.restaurarPalavraSecreta(letra);
      if (this.palavraSecreta === this.palavraOriginal) {
        console.log(`Parabéns! Você acertou! A palavra era: ${this.palavraOriginal}`);
        controlador.encerrarJogo();
      } else {
        console.log(`Letra correta!`);
      }
    } else {
      this.contadorTentativas--;
      console.log(`Letra incorreta. Tentativas restantes: ${this.contadorTentativas}`);
      if (this.contadorTentativas === 0) {
        console.log(`FORCA! A palavra era: ${this.palavraOriginal}`);
        controlador.encerrarJogo();
      }
    }
  }

  tentarComPalavra(palavra) {
    if (palavra === this.palavraOriginal) {
      console.log(`Parabéns! Você acertou! A palavra era: ${this.palavraOriginal}`);
      controlador.encerrarJogo();
    } else {
      this.contadorTentativas === 0;
      console.log(`FORCA! A palavra era: ${this.palavraOriginal}`);
      controlador.encerrarJogo();
    }
  }
  
  restaurarPalavraSecreta(letra) {
    for (let i = 0; i < this.palavraOriginal.length; i++) {
      if (this.palavraOriginal[i] === letra) {
        this.palavraSecreta =
          this.palavraSecreta.substring(0, i) +
          letra +
          this.palavraSecreta.substring(i + 1);
      }
    }
  }

  reiniciar() {
    this.palavraSecreta = "_".repeat(this.palavraOriginal.length);
    this.contadorTentativas = 7;
    this.letrasTentadas = new Set();
  }
}

const controlador = new Controlador();
const jogador1 = controlador.adicionarJogador(readlineSync.question("Digite seu nome jogador(a):"));
const palavra = readlineSync.question("Digite a palavra a ser adivinhada:", {hideEchoBack: true});
const dica = readlineSync.question("Digite uma dica para a palavra escolhida:");


controlador.criarPartida(palavra,dica);
console.log("\nBem-vindo ao jogo da FORCA |º.")
console.log("REGRAS: Você pode tentar letras ou palavras. Você tem 7 chances, porém se tentar palavra é uma chance só. VAMOS LÁ!")
console.log (jogador1);

while (true) {
  console.log('\nVamos, lá...')
  console.log(`A palavra secreta é: ${controlador.partidaAtual.palavraSecreta}`)
  console.log(`Dica: ${controlador.partidaAtual.dica}`)
  console.log("\nEscolha...");
  console.log("1. Realizar jogada");
  console.log("2. Reiniciar partida");
  console.log("3. Sair");

  const opcao = readlineSync.question("Escolha uma alternativa: ");

  switch (opcao) {
    case "1":
      const tentativa = readlineSync.question("Digite uma letra ou palavra: ");
      controlador.realizarJogada(jogador1, tentativa);
      break;

    case "2":
      controlador.reiniciarPartida();
      break;

    case "3":
      controlador.encerrarJogo();
      break

    default:
      console.log("Opção inválida. Tente novamente.");
  }
}



