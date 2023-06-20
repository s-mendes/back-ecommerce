import { Request, Response } from 'express';
import { products } from '../database/database';

export function deleteProducts(req: Request, res: Response):void {
    const id = req.params.id as string

    try {
        const productIndex = products.findIndex(product => product.id === id)

        if (productIndex < 0) {
            res.status(404)
            throw new Error(`Product ${id} not found`)
        }

        products.splice(productIndex, 1)
        res.status(200).send(`Product ${id} deleted successfully`)
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