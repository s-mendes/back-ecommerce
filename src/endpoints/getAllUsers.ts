import { Request, Response } from 'express';
import { db } from '../database/knex';

export async function getAllUsrs (req: Request, res: Response):Promise<void> {
    try {
        const users = await db.select('*').from('users');
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}