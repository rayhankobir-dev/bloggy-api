import { Injectable } from '@nestjs/common';
import helmet from 'helmet';

@Injectable()
export class HelmetConfig {
  static getOptions() {
    return helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'default-src': ["'self'"],
          'img-src': ["'self'", 'data:', 'https:'],
          'script-src': ["'self'", "'unsafe-inline'"],
          'style-src': ["'self'", 'https:', "'unsafe-inline'"],
        },
      },
      referrerPolicy: { policy: 'no-referrer' },
      frameguard: { action: 'deny' },
      hsts: {
        maxAge: 31536000, // 1 year in seconds
        includeSubDomains: true,
        preload: true,
      },
      noSniff: true,
      xssFilter: true,
    });
  }
}
