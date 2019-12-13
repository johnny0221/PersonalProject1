import { Component, OnInit } from '@angular/core';
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

  private userId;
  private userDetail;
  private totalPrice = 0;

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.shoppingCartService.getTargetUser(this.userId);
    this.shoppingCartService.UserSubjectListener().subscribe((data) => {
      this.userDetail = data.cart;
      //refactor the userDetail Data.
      this.userDetail = this.userDetail.reduce(this.ReducerFunction, {});
      //turning the 2D object into an array of objects.
      //use one of the three methods 1.for..in loop 2.Object.keys() / values()
      this.userDetail = Object.values(this.userDetail);
      //recalculate everytime
      this.totalPrice = 0;
      //calculating the total price.
      for (const product of this.userDetail) {
        this.totalPrice = this.totalPrice + (product.price * product.amount);
      }
    });
  }

  AddOne(productId: string) {
    this.shoppingCartService.AddOnetoCart(this.userId, productId).subscribe((data) => {
      this.shoppingCartService.getTargetUser(this.userId);
    });
  }

  MinusOne(productId: string) {
    this.shoppingCartService.DeleteFromCart(this.userId, productId).subscribe(data => {
      this.shoppingCartService.getTargetUser(this.userId);
    });
  }

  DeleteAll(productId: string) {
    this.shoppingCartService.DeleteAllFromCart(this.userId, productId).subscribe(data => {
      this.shoppingCartService.getTargetUser(this.userId);
    })
  }

  ToProductPage() {
    this.router.navigate(['/chinese/product']);
  }


  //helper function
  ReducerFunction = (obj, item) => {
    //"obj" means the starting value, which is an empty object.
    //"item" means each current value in the array.
    let ItemName = item['name'];
    if (obj[ItemName]) {
      obj[ItemName].amount = obj[ItemName].amount + 1;
    } else {
      obj[ItemName] = {
        name: item['name'],
        amount: 1,
        price: item['price'],
        imageUrl: item['imageUrl'],
        productId: item['_id']
      };
    }
    return obj;
  };

}
