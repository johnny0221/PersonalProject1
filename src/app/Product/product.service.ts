import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../Interfaces/product.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {

    constructor(private http: HttpClient, private router: Router) { }

    productData: Subject<ProductModel> = new Subject<ProductModel>();

    createProduct(product: ProductModel) {
        this.http.post<{ message: string }>('http://localhost:3000/product', product).subscribe((message) => {
            console.log(message);
            this.router.navigate(['/chinese/product']);
        });
    }
}