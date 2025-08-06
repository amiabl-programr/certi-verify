import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Request } from '../types/index'
import { UserModel } from '../models/user';
import { verifyToken } from '../utils/token';

// // Extend Express Request interface to include 'user'
// declare global {
//   namespace Express {
//     interface Request {
//       user?: any;
//     }
//   }
// }

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const decoded = verifyToken(token) as { userId: string };

    const user = await UserModel.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token', error: err });
  }
};
