import { Request, Response, NextFunction } from 'express';
import { tokenService } from '../services/token';
import {AuthJwtPayload} from "../types";

const authMiddleware = (req: Request<unknown, unknown, unknown, unknown>, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const decoded = tokenService.verifyAccessToken(token) as AuthJwtPayload;
  
    if (decoded == null) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  
    req.userId = decoded.userId;
  
    next();
}

export default authMiddleware;
