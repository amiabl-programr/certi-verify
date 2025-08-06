import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.JWT_SECRET as string;

export const generateToken = (userId:string) => {
  return jwt.sign({userId},secret,{expiresIn:'2h'})
//   return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
