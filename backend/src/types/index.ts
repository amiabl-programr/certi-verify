import { Request as ExpressRequest } from "express";
import { JwtPayload } from "jsonwebtoken";
// import { Request as ExpressRequest } from 'express';
import { IUser } from '../models/user';

export interface Request extends ExpressRequest {
  user?: IUser
}
// export interface Request extends ExpressRequest {
//   ;
// }
