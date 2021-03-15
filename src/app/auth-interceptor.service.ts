import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Http Interceptors");
        const modifiedReques = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        })
        return next.handle(modifiedReques);
    }
}