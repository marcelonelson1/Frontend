import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, tap, filter } from "rxjs";

export const httpInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    console.log('[LogInterceptor] Request went through interceptor');
    return next(req).pipe(
        filter(event => event instanceof HttpResponse),
        tap(() => {
            console.log('[LogInterceptor] Response went through interceptor');
        })
    );
};
