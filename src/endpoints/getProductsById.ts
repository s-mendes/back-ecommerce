import { Request, Response } from 'express';
import { products } from '../database/database';
import { TProduct } from '../interfaces/types/product.type';

export function getProductsById (req: Request, res: Response):void {
    try {
        const q = req.query.q as string

        if (q.length < 1) {
            res.status(404)
            throw new Error("Insert a product search")
        }
        
        const result: TProduct[] = products.filter((prod) => prod.name.toLowerCase().includes(q.toLowerCase()))
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