import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AUTH_TOKEN} from "../auth/services/authService";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = localStorage.getItem(AUTH_TOKEN);

        if(token) {
            const clonedReq = request.clone({
                headers: request.headers.set('Authorization',
                    `Bearer ${token}`)
            });
            return next.handle(clonedReq);
        } else {
            return next.handle(request);
        }
    }
}
