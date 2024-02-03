import { NextFunction, Request, Response } from 'express';
import verify from '../utils/jwt';

export default class ValidateToken {
  public static validate(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      const payload = verify.verifyToken(token);
      req.body.user = payload;

      next();
    } catch (error) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
