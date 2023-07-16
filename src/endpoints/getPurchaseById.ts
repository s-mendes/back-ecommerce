import { Request, Response } from 'express';
import { db } from '../database/knex'

export async function getPurchaseById(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id as string

        if (id.length < 1) {
            res.status(404)
            throw new Error("Insert a id to search")
        }

        const purchaseProducts = await db('purchases').select(
            'purchases.id AS purchaseId',
            'users.id AS buyerId',
            'users.name AS buyerName',
            'users.email AS buyerEmail',
            'products.id AS productId',
            'products.name AS productName',
            'products.price AS productPrice',
            'products.description AS productDescription',
            'products.image_url AS productImageUrl',
            'purchases_products.quantity AS productQuantity',
            'purchases.total_price AS totalPrice',
            'purchases.created_at AS createdAt'
        )
        .join("users", "purchases.buyer", "=", "users.id")
        .join("purchases_products", "purchases.id", "=", "purchases_products.purchase_id")
        .join("products", "purchases_products.product_id", "=", "products.id")
        .where('purchases.id', id)

        console.log(purchaseProducts)

        if (purchaseProducts.length < 1) {
            res.status(404)
            throw new Error("Purchase not found")
        }

        const purchase = {
            purchaseId: purchaseProducts[0].purchaseId,
            buyerId: purchaseProducts[0].buyerId,
            buyerName: purchaseProducts[0].buyerName,
            buyerEmail: purchaseProducts[0].buyerEmail,
            totalPrice: purchaseProducts[0].totalPrice,
            createdAt: purchaseProducts[0].createdAt,
            products: purchaseProducts.map((row) => ({
                id: row.productId,
                name: row.productName,
                price: row.productPrice,
                description: row.productDescription,
                imageUrl: row.productImageUrl,
                quantity: row.productQuantity
            }))
        };

        res.status(200).send(purchase)

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