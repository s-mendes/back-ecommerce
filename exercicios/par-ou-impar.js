const parOuImpar = process.argv[2];
const numero = Number(process.argv[3]);
const result = (Math.floor(Math.random() * 6) + numero);
const resultParOuImpar = result % 2 === 0 ? "par" : "impar";

const venceu = resultParOuImpar == parOuImpar ? true : false;

console.log(`Você escolheu ${parOuImpar} e o computador escolheu ${parOuImpar == "par" ? "impar" : "par"}. O resultado foi ${result}. Você ${venceu ? 'ganhou' : 'perdeu'}!`);