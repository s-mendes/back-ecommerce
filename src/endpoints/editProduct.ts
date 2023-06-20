import { Request, Response } from 'express';
import { products } from '../database/database';

export function editProduct (req: Request, res: Response): void {
    const id = req.params.id as string

    try {

        const newId = req.body.id as number
        const newName = req.body.name as string
        const newDescription = req.body.description as string
        const newPrice = req.body.price as number
        const newImageUrl = req.body.url as string

        const product = products.find(product => product.id === id)

        if (!product) {
            res.status(404)
            throw new Error(`Product ${id} not found`)
        }

        const idExists = products.find(product => product.id === newId)

        if (idExists) {
            res.status(421)
            throw new Error(`Product id ${newId} already exist`)
        }

        if (newName !== undefined) {
            if (newName.length < 3) {
                res.status(411)
                throw new Error(`Product name must be at least 3 characters`)
            }
        }

        if (newDescription !== undefined) {
            if (newDescription.length < 10) {
                res.status(411)
                throw new Error(`Description must be at last 10 characters`)
            }
        }

        if (newPrice !== undefined) {
            if (newPrice < 0) {
                res.status(411)
                throw new Error(`Price must be positive`)
            }
        }

        product.id = newId || product.id
        product.name = newName || product.name
        product.description = newDescription || product.description
        product.price = newPrice || product.price
        product.imageUrl = newImageUrl || product.imageUrl

        res.status(200).send(`Product ${product.name} edited successfully`)

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