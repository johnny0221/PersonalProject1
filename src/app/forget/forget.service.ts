import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ForgetService {

    constructor(private http: HttpClient) { }

    forgetpwd(email: string) {
        let useremail = {
            email
        }
        return this.http.post<{ message: string }>('http://localhost:3000/forgetpwd', useremail);
    }

}