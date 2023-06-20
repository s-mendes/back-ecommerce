import { Request, Response } from 'express';
import { products } from '../database/database';
import { TProduct } from '../interfaces/types/product.type';

export function createProducts (req: Request, res: Response):void {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const description = req.body.description as string
        const price = req.body.price as number
        const imageUrl = req.body.url as string

        const idExists = products.find(product => product.id === id)

        if (idExists) {
            res.status(421)
            throw new Error(`Product id ${id} already exist`)
        }

        if (name !== undefined) {
            if (name.length < 3) {
                res.status(411)
                throw new Error(`Product name must be at least 3 characters`)
            }
        }

        if (description !== undefined) {
            if (description.length < 10) {
                res.status(411)
                throw new Error(`Description must be at last 10 characters`)
            }
        }

        if (price !== undefined) {
            if (price < 0) {
                res.status(411)
                throw new Error(`Price must be positive`)
            }
        }

        const newProduct: TProduct = {
            id: id,
            name: name,
            price: price,
            description: description,
            imageUrl: imageUrl
        }
        products.push(newProduct);
        console.log(products);
        res.status(200).send("Registration done successfully")

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