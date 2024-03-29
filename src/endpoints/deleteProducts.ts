import { Request, Response } from 'express';
import { db } from '../database/knex';

export async function deleteProducts(req: Request, res: Response):Promise<void> {
    try {
        const idToDelete = req.params.id as string
        const [ product ] = await db("products").where({ id: idToDelete })
    
        if (!product) {
            res.status(404)
            throw new Error("'id' não encontrado.")
        }
        await db("products").where({ id: idToDelete }).del()
        res.status(200).send({ message: "Produto deletado com sucesso" })

    } catch (error) {

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
}