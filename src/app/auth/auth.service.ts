import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class authService {

    constructor(private http: HttpClient, private router: Router) { }

    private authStatus = new BehaviorSubject<boolean>(false);
    private adminStatus = new BehaviorSubject<boolean>(false);
    private username: string;
    private userid: string;
    private token: string;
    private tokenTimer;

    getToken() {
        return this.token;
    }

    getUsername() {
        return this.username;
    }

    getUserId() {
        return this.userid || 'notauthenticated';
    }

    getAuthStatus() {
        return this.authStatus.asObservable();
    }

    getAdminStatus() {
        return this.adminStatus.asObservable();
    }


    createUser(user) {
        this.http.post<{ message: string, result: IUser }>('http://localhost:3000/user/signup', user).subscribe(
            (data) => {
                if (data.result.name === 'admin') {
                    this.adminStatus.next(true);
                }
                this.router.navigate(['/auth/login']);
            },
            error => {
                this.authStatus.next(false);
            })
    }

    checkUserName() {
        return this.http.get<{ data: IUser[] }>('http://localhost:3000/user');
    }

    login(username: string, password: string) {
        const user = {
            name: username,
            password: password
        }
        this.http.post<{ name: string, token: string, expiresIn: number, userId: string, cart: [], likedProduct: [] }>('http://localhost:3000/user/login', user).subscribe(
            (data) => {
                this.token = data.token;
                const expiresInDuration = data.expiresIn;
                this.userid = data.userId;
                this.username = data.name;
                this.setAuthTimer(expiresInDuration);
                const now = new Date();
                //now + 1hr
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                this.saveAuthData(this.token, expirationDate, this.userid);
                this.authStatus.next(true);
                if (data.name === 'admin') {
                    this.adminStatus.next(true);
                }
                this.router.navigate(['/chinese']);
            },
            error => {
                this.authStatus.next(false);
            })
    }

    autoLogin() {
        const userInfo = this.getAuthData();
        if (!userInfo) {
            return;
        }
        const now = new Date();
        const expiresIn = userInfo.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = userInfo.token;
            this.userid = userInfo.userId;
            this.setAuthTimer(expiresIn / 1000);
            if (this.userid === '5e0adc3f9c768b4bb47ecff1') {
                this.adminStatus.next(true);
            }
            this.authStatus.next(true);
        }
    }

    logout() {
        this.token = null;
        this.userid = null;
        this.username = null;
        clearTimeout(this.tokenTimer);
        this.authStatus.next(false);
        this.adminStatus.next(false);
        this.clearAuthData();
        this.router.navigate(['/auth/login']);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate.toISOString());
        localStorage.setItem("userId", userId);
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationDate");
        localStorage.removeItem("userId");
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expirationDate");
        const userId = localStorage.getItem("userId");
        if (!token || !expirationDate || !userId) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        }
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }
}