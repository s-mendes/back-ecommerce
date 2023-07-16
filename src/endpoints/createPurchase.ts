import { Request, Response } from 'express';
import { db } from '../database/knex'

interface Product {
    id: string;
    quantity: number;
}

interface Purchase {
    id: string;
    buyer: string;
    products: Product[];
}

export async function createPurchase(req: Request, res: Response): Promise<void> {
    try {
        const { id, buyer, products }: Purchase = req.body;

        const existingPurchase = await db('purchases').select().where('id', id).first();
        if (existingPurchase) {
            res.status(400);
            throw new Error('Purchase already exists');
        }

        const productDetails = await db('products').select().whereIn('id', products.map(p => p.id));
        if (productDetails.length !== products.length) {
            res.status(404);
            throw new Error('One or more products not found');
        }

        const totalPrice = products.reduce((total, product) => {
            const productDetail = productDetails.find(p => p.id === product.id);
            return total + (productDetail.price * product.quantity);
        }, 0)

        await db.transaction(async (trx) => {

            await trx('purchases').insert({
                id,
                buyer,
                total_price: totalPrice,
                created_at: new Date().toISOString()
            });
            const purchaseProducts = products.map(product => ({
                purchase_id: id,
                product_id: product.id,
                quantity: product.quantity
            }));
            await trx('purchases_products').insert(purchaseProducts);
        });

        res.status(201).send('Purchase created successfully');

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