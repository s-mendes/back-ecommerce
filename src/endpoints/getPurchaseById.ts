import { Request, Response } from 'express';
import { TProduct } from '../interfaces/types/product.type';
import { db } from '../database/knex'

export async function getPurchaseById (req: Request, res: Response):Promise<void> {
    try {
        const id = req.params.id as string

        if (id.length < 1) {
            res.status(404)
            throw new Error("Insert a id to search")
        }
        
        const purchases = await db.raw(`
        SELECT * FROM purchases;
        `)

        const result: TProduct[] = purchases.filter((prod:any) => prod.id.toLowerCase().includes(id.toLowerCase()))
        res.status(200).send(result)

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