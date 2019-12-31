import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ResetService {

    constructor(private http: HttpClient) { }

    isPermitted(token: string) {
        const resetToken = { token };
        return this.http.post<{ message: string }>('http://localhost:3000/ispermitted', resetToken);
    }

    resetPassword(password: string, token: string) {
        const userpwd = { password, token };
        return this.http.post<{ message: string }>('http://localhost:3000/resetpwd', userpwd);
    }
}