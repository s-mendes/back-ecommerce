import { Request, Response } from 'express';
import { products } from '../database/database';

export function getAllProducts (req: Request, res: Response):void {
    try {
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error)
    }
}