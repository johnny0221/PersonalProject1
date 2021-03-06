import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../auth/user.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class shoppingCartService {

    constructor(private http: HttpClient) { }

    private UserSubject: Subject<any> = new Subject<any>();

    UserSubjectListener() {
        return this.UserSubject.asObservable();
    }

    getTargetUser(id: string) {
        this.http.get<{ userdata: IUser }>(`http://localhost:3000/user/${id}`).subscribe(data => {
            this.UserSubject.next(data.userdata);
        });
    }

    AddOnetoCart(userId: string, productId: string) {
        let data = {
            userId,
            productId
        };
        return this.http.post<{ message: string }>('http://localhost:3000/cart/add', data);
    }

    UpdateProductQuant(userId: string, productId: string, quant: number) {
        let data = {
            productId,
            userId,
            quant
        }
        this.http.post<{ userdata: IUser }>('http://localhost:3000/cart/update', data).subscribe(data => {
            this.UserSubject.next(data.userdata);
        });
    }

    DeleteAllFromCart(userId: string, productId: string) {
        let data = {
            userId: userId,
            productId: productId
        };
        this.http.post<{ userdata: IUser }>('http://localhost:3000/cart/deleteall', data).subscribe(data => {
            this.UserSubject.next(data.userdata);
        });
    }


}