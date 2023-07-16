import { Request, Response } from 'express';
import { TProduct } from '../interfaces/types/product.type';
import { db } from '../database/knex'

export async function getProductsById (req: Request, res: Response):Promise<void> {
    try {
        const id = req.params.id as string

        if (id.length < 1) {
            res.status(404)
            throw new Error("Insert a id to search")
        }
        
        const product = await db.select('*').from('products').where('id', id)

        if (product.length < 1) {
            res.status(404)
            throw new Error("Product not found")
        }

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