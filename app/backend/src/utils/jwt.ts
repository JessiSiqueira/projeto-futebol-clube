import * as jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'jwtSecret';

type Payload = {
  id: number;
  email: string;
};

const userToken = (payload: Payload): string => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: '7d',
  });
  return token;
};

const verifyToken = (token: string): Payload => jwt.verify(token, jwtSecret) as Payload;

export default {
  userToken,
  verifyToken,
};
