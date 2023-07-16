import { Request, Response } from 'express';
import { db } from '../database/knex'

export async function deletePurchase (req: Request, res: Response): Promise<void> {
    try {
        const idToDelete = req.params.id as string

        const [ purchase ] = await db("purchases").where({ id: idToDelete })
        if (!purchase) {
            res.status(404)
            throw new Error("'id' não encontrado.")
        }

        await db("purchases").where({ id: idToDelete }).del()

        res.status(200).send({ message: "Compra deletado com sucesso" })
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