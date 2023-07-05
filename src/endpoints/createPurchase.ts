import { Request, Response } from 'express';
import { db } from '../database/knex'

export async function createPurchase (req: Request, res: Response): Promise<void> {
    try {
        const id = req.body.id as string;
        const buyer = req.body.buyer as string;
        const totalPrice = req.body.totalPrice as number;
        const createdAt = req.body.createdAt as string;

        const purchases = await db.raw(`
        SELECT * FROM purchases;
        `)

        const idExists = purchases.find((p:any) => p.id === id)

        if (idExists) {
            res.status(421);
            throw new Error(`Purchases ${id} already exists`);
        }
        if(buyer !== undefined) {
            if(buyer.length < 3) {
                res.status(411);
                throw new Error(`Purchases buyer must be at least 3 characters`);
            }
        }
        if (totalPrice !== undefined){
            if(totalPrice < 0) {
                res.status(411);
                throw new Error(`Total Price must be positive`);
            }
        }
        await db.raw(`
        INSERT INTO purchases (id, buyer, total_price, created_at) VALUES
        ('${id}', '${buyer}', '${totalPrice}', '${new Date().toISOString()}');
        `);
        
        res.status(200).send("Purchase done sucessfully");

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