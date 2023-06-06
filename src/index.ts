//além de importar o express, também precisamos importar os objetos Request
//e Response, sempre entre chaves {} 👇🏽
import  express, { Request, Response} from 'express'
import { createProduct, createUser, getAllProducts, searchProductsByName, TProduct } from './database'
//import do CORS 👇🏽
import cors from 'cors';

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

app.get('/ping', (req: Request, res: Response) => {
    res.send('pong')
})

app.get('/products', (req: Request, res: Response) => {
    res.send(getAllProducts())
})

app.get('/products/search', (req: Request, res:Response) => {
    const q = req.query.q as string
    const result: TProduct[] = searchProductsByName(q)
    res.send(result)
})

app.post('/products', (req: Request, res: Response) => {
    const id = req.body.id as number
    const name = req.body.name as string
    const description = req.body.description as string
    const price = req.body.price as number
    const imageUrl = req.body.url as string

    console.log(imageUrl)
    res.send(createProduct(id, name, price, description, imageUrl))
})

app.post('/users', (req: Request, res: Response) => {
    const id = req.body.id as number
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string

    res.send(createUser(id, name, email, password))
})