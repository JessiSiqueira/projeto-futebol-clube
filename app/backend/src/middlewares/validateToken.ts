import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

export default class ValidateToken {
  public static validate(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorizationHeader.split(' ')[1];
    console.log('olha aqui', token);

    try {
      const verifyToken2 = verifyToken(token);
      console.log('aquimerma', verifyToken2);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
