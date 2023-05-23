function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const jogadas = ["pedra", "papel", "tesoura"];
const jogadaJogador = process.argv[2];
const jogadaDev = jogadas[getRndInteger(0, 2)];

if (jogadaJogador === jogadaDev) {
    console.log(`Você escolheu ${jogadaJogador} e o computador escolheu ${jogadaDev}. Empate!`);
} else if (
    (jogadaJogador === "pedra" && jogadaDev === "tesoura") ||
    (jogadaJogador === "papel" && jogadaDev === "pedra") ||
    (jogadaJogador === "tesoura" && jogadaDev === "papel")
) {
    console.log(`Você escolheu ${jogadaJogador} e o computador escolheu ${jogadaDev}. Você ganhou!`);
} else {
    console.log(`Você escolheu ${jogadaJogador} e o computador escolheu ${jogadaDev}. Você perdeu!`);
}