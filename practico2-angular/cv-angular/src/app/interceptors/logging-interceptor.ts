import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();

  console.log(`[HTTP REQUEST] ${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);

  return next(req).pipe(
    tap({
      next: (event) => {
        const elapsedTime = Date.now() - startTime;
        console.log(`[HTTP RESPONSE] ${req.method} ${req.url} - Success in ${elapsedTime}ms`);
      },
      error: (error) => {
        const elapsedTime = Date.now() - startTime;
        console.error(`[HTTP ERROR] ${req.method} ${req.url} - Failed in ${elapsedTime}ms`, error);
      }
    })
  );
};
