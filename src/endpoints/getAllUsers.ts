import { Request, Response } from 'express';
import { users } from '../database/database';

export function getAllUsrs (req: Request, res: Response):void {
    try {
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
}