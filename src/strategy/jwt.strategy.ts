import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { configService } from '../config/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.getJWTSecret(),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(payload: any) {
    return { id: payload.id, name: payload.name, usertype: payload.usertype };
  }
}
