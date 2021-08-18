import jwt from 'jsonwebtoken';

const secret = 'my-secret';

export const sign = async (id: string) => {
  return await jwt.sign({ id }, secret, { expiresIn: '24h' });
};

export const verify = async (token: string) => await jwt.verify(token, secret);
