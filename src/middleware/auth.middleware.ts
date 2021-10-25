import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { ACCESS_TOKEN_HEADER_NAME } from '../constants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.get(ACCESS_TOKEN_HEADER_NAME);

    if (!accessToken) {
      throw new UnauthorizedException(
        'You do not have permissions to perform this action',
      );
    }

    jwt.verify(accessToken, config.get('jwtSecretKey'), (error, decoded) => {
      if (error) {
        throw new UnauthorizedException(
          'You do not have permissions to perform this action',
        );
      } else {
        if (Date.now() > decoded.exp) {
          throw new UnauthorizedException(
            'Session expired, please re-authenticate',
          );
        }
        next();
      }
    });
  }
}
