import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../Interfaces/product.model';
import { ProductDetailModel } from '../Interfaces/product-detail';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ProductService {

    constructor(private http: HttpClient, private router: Router) { }

    ProductData: ProductModel[] = []
    private TargetProductSub: Subject<any> = new Subject();
    private productDataSub: Subject<ProductModel[]> = new Subject<ProductModel[]>();
    private IngredientDataSub: Subject<string[]> = new Subject();

    ProductDataSubListener() {
        return this.productDataSub.asObservable();
    }

    TargetProductSubListener() {
        return this.TargetProductSub.asObservable();
    }

    createProduct(product: ProductModel) {
        this.http.post<{ message: string }>('http://localhost:3000/product', product).subscribe((message) => {
            console.log(message);
            this.router.navigate(['/chinese/product/' + product.type]);
        });
    }

    getProduct() {
        this.http.get<{ data: any[] }>('http://localhost:3000/product')
            .pipe(
                map((product) => {
                    return {
                        product: product.data.map(
                            (product) => {
                                return {
                                    id: product._id,
                                    name: product.name,
                                    type: product.type,
                                    price: product.price,
                                    calory: product.calory,
                                    imageUrl: product.imageUrl,
                                    description: product.description,
                                    ingredients: product.ingredients
                                }
                            })
                    }
                })
            )
            .subscribe((data) => {
                this.ProductData = data.product;
                this.productDataSub.next([...this.ProductData]);
            })
    }

    getDessertProduct() {
        this.http.get<{ data: any[] }>('http://localhost:3000/product/dessert')
            .pipe(
                map((product) => {
                    return {
                        product: product.data.map(
                            (product) => {
                                return {
                                    id: product._id,
                                    name: product.name,
                                    type: product.type,
                                    price: product.price,
                                    calory: product.calory,
                                    imageUrl: product.imageUrl,
                                    description: product.description,
                                    ingredients: product.ingredients
                                }
                            })
                    }
                })
            )
            .subscribe((data) => {
                this.ProductData = data.product;
                this.productDataSub.next([...this.ProductData]);
            })
    }

    getDrinkProduct() {
        this.http.get<{ data: any[] }>('http://localhost:3000/product/drink')
            .pipe(
                map((product) => {
                    return {
                        product: product.data.map(
                            (product) => {
                                return {
                                    id: product._id,
                                    name: product.name,
                                    type: product.type,
                                    price: product.price,
                                    calory: product.calory,
                                    imageUrl: product.imageUrl,
                                    description: product.description,
                                    ingredients: product.ingredients
                                }
                            })
                    }
                })
            )
            .subscribe((data) => {
                this.ProductData = data.product;
                this.productDataSub.next([...this.ProductData]);
            })
    }

    getLightmealProduct() {
        this.http.get<{ data: any[] }>('http://localhost:3000/product/lightmeal')
            .pipe(
                map((product) => {
                    return {
                        product: product.data.map(
                            (product) => {
                                return {
                                    id: product._id,
                                    name: product.name,
                                    type: product.type,
                                    price: product.price,
                                    calory: product.calory,
                                    imageUrl: product.imageUrl,
                                    description: product.description,
                                    ingredients: product.ingredients,
                                }
                            })
                    }
                })
            )
            .subscribe((data) => {
                this.ProductData = data.product;
                this.productDataSub.next([...this.ProductData]);
            })
    }

    getTargetProduct(id: string, pageSize?: number, currentPage?: number) {
        if (pageSize && currentPage) {
            const queryParams = `?pagesize=${pageSize}&page=${currentPage}`;
            this.http.get<{ data: ProductDetailModel, comments: any, maxComments: any }>(`http://localhost:3000/product/${id}${queryParams}`).subscribe((data) => {
                const productData = { ...data };
                this.TargetProductSub.next(productData);
            })
        } else {
            this.http.get<{ data: ProductDetailModel }>(`http://localhost:3000/product/${id}`).subscribe((data) => {
                const productData = { ...data };
                this.TargetProductSub.next(productData);
            })

        }
    }

    updateTargetProduct(id: string, product: ProductModel) {
        const updateProduct = {
            id: id,
            name: product.name,
            type: product.type,
            price: product.price,
            calory: product.calory,
            imageUrl: product.imageUrl,
            description: product.description,
            ingredients: product.ingredients
        }
        //回到哪個route
        const navigateRoute = product.type;
        this.http.put(`http://localhost:3000/product/${id}`, updateProduct).subscribe((message) => {
            this.router.navigate(['/chinese/product/' + navigateRoute]);
        })
    }

    deleteProduct(id: string, currentType: string) {
        this.http.delete(`http://localhost:3000/product/${id}`).subscribe((message) => {
            this.getType(currentType);
            this.router.navigate([`/chinese/product/${currentType}`]);
        })
    }

    //for ingredient part
    getIngredient() {
        return this.http.get<{ ingredients: string[] }>('http://localhost:3000/ingredient');
    }

    updateIngredient(ingredients: string[]) {
        this.http.put<{ msg: string }>('http://localhost:3000/ingredient', ingredients).subscribe((msg) => {
            this.router.navigate(['/chinese/product'])
        })
    }

    //helper for product part
    getType(currentType: string) {
        if (currentType === 'desserts') {
            this.getDessertProduct();
        } else if (currentType === 'drinks') {
            this.getDrinkProduct();
        } else if (currentType === 'lightmeals') {
            this.getLightmealProduct();
        }
    }

    //Main page get random 4 product
    getRandomProduct() {
        return this.http.get<ProductModel[]>('http://localhost:3000/randomproduct');
    }

    //add Comments to the product
    addComment(productId: string, userId: string, comment: string) {
        let commentData = {
            productId: productId,
            userId: userId,
            comment: comment
        }
        console.log('hi');
        return this.http.post<{ message: string, product: any }>('http://localhost:3000/comment/add', commentData);
    }

    //delete Comments
    deleteComment(id: string) {
        return this.http.delete<{ message: string }>(`http://localhost:3000/comment/delete/${id}`);
    }
}