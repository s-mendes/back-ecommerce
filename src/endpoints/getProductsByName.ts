import { Request, Response } from 'express';
import { TProduct } from '../interfaces/types/product.type';
import { db } from '../database/knex'

export async function getProductsByName (req: Request, res: Response):Promise<void> {
    try {
        const q = req.query.q as string

        if (q.length < 1) {
            res.status(404)
            throw new Error("Insert a product search")
        }
        
        const products = await db.raw(`
        SELECT * FROM products;
        `)

        const result: TProduct[] = products.filter((prod:any) => prod.name.toLowerCase().includes(q.toLowerCase()))
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