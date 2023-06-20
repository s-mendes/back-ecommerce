//além de importar o express, também precisamos importar os objetos Request
//e Response, sempre entre chaves {} 👇🏽
import express, { Request, Response } from 'express'
import { products, users } from './database/database'
//import do CORS 👇🏽
import cors from 'cors';
import { getAllProducts } from './endpoints/getAllProducts';
import { getProductsById } from './endpoints/getProductsById';
import { createProducts } from './endpoints/createProduct';
import { getAllUsrs } from './endpoints/getAllUsers';
import { createUsers } from './endpoints/createUsers';
import { deleteUsers } from './endpoints/deleteUsers';
import { deleteProducts } from './endpoints/deleteProducts';
import { editProduct } from './endpoints/editProduct';

//criação do servidor express 👇🏽
const app = express();

//configuração do middleware que garante que nossas respostas estejam sempre
//no formato json 👇🏽
app.use(express.json());

//configuração do middleware que habilita o CORS 👇🏽
app.use(cors());

//colocando nosso servidor para escutar a porta 3003 da nossa máquina (primeiro 
//parâmetro da função listen)
//a função de callback (segundo parâmetro da função listen) serve para sabermos 
//que o servidor está de pé, através do console.log que imprimirá a mensagem no 
//terminal 👇🏽

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});


app.get('/products', getAllProducts);
app.get('/products/search', getProductsById);
app.post('/products', createProducts);
app.delete('/products/:id', deleteProducts);
app.put('/products/:id', editProduct);

app.get('/users', getAllUsrs);
app.post('/users', createUsers);
app.delete('/users/:id', deleteUsers);
