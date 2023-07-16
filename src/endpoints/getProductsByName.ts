import { Request, Response } from 'express';
import { TProduct } from '../interfaces/types/product.type';
import { db } from '../database/knex'

export async function getProductsByName (req: Request, res: Response):Promise<void> {
    try {
        const q = req.query.name as string

        if (q.length < 1) {
            res.status(404)
            throw new Error("Insert a product search")
        }
        
        const product = await db.select('*').from('products').where('name', 'like', `%${q}%`)

        res.status(200).send(product)

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