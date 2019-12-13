import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: authService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.authService.getToken();
        const userId = this.authService.getUserId();
        //header不允許undefined的value當作header
        const authRequest = req.clone({
            headers: new HttpHeaders({
                'Authorization': "Bearer " + token,//We set the header named "Authorization" to value"Barer ......""
                'user': userId
            })
        });
        return next.handle(authRequest);
    }
}