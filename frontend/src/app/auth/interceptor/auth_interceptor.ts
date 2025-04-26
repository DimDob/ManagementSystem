import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../token.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  const modifiedReq = req.clone({
    setHeaders: {
      'FIB-X-AUTH': token || '',
      'Content-Type': 'application/json'
    }
  });

  return next(modifiedReq);
};
