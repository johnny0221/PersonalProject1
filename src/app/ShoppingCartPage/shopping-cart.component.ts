import { Component, OnInit, OnDestroy } from '@angular/core';
import { authService } from '../auth/auth.service';
import { shoppingCartService } from './shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(
    private authService: authService,
    private shoppingCartService: shoppingCartService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  private userId: string;
  public userDetail;
  public totalPrice: number = 0;
  public quantites: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.shoppingCartService.getTargetUser(this.userId);
    this.shoppingCartService.UserSubjectListener().subscribe((data) => {
      this.userDetail = data.cart;

      //recalculate everytime
      this.totalPrice = 0;
      //calculating the total price.
      for (const product of this.userDetail) {
        this.totalPrice = this.totalPrice + (product.price * product.quantity);
      }
    });
  }

  selectChange(productId: string, number: number) {
    this.shoppingCartService.UpdateProductQuant(this.userId, productId, number);
  }

  DeleteAll(productId: string) {
    this.shoppingCartService.DeleteAllFromCart(this.userId, productId);
  }

  ToProductPage() {
    this.router.navigate(['/product']);
  }

  ngOnDestroy() {

  }


  // helper function
  // ReducerFunction = (obj, item) => {
  //   "obj" means the starting value, which is an empty object.
  //   "item" means each current value in the array.
  //   let ItemName = item['name'];
  //   if (obj[ItemName]) {
  //     obj[ItemName].amount = obj[ItemName].amount + 1;
  //   } else {
  //     obj[ItemName] = {
  //       name: item['name'],
  //       amount: 1,
  //       price: item['price'],
  //       imageUrl: item['imageUrl'],
  //       productId: item['_id']
  //     };
  //   }
  //   return obj;
  // };

}
