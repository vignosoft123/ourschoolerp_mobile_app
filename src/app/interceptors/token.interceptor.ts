import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {Injectable} from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: any = localStorage.getItem('tokenKey');

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }));
    }

 //    intercept(httpReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 //            if (localStorage.getItem('tokenKey')) {
 //                const token = localStorage.getItem('tokenKey');
 //                const req = httpReq.clone({
 //                    setHeaders: {
 //                        'Authorization': 'Bearer ' + token,
 //                        'Content-Type': 'application/json',
 //                         'Access-Control-Allow-Origin': '*'
 //                    }
 //                });
 //                return next.handle(req);
 //            } else {
 //                const req = httpReq.clone({
 //                    headers: httpReq.headers.set('Content-Type', 'application/json'),
 //                });
 //                return next.handle(req);
 //            }
 // }

}
