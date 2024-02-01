import { NextFunction, Request, Response } from 'express';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
export default Validations;