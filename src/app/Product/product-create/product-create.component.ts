import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProductModel } from '../../Interfaces/product.model';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  constructor(private productService: ProductService) { }

  form: FormGroup;
  types: string[] = ['drink', 'dessert', 'lightmeal'];
  ingredients: string[] = ['巧克力', '草莓', '奶油', '鮮奶油'];

  createForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, { validators: [Validators.required] }),
      'type': new FormControl('coffee', { validators: [Validators.required] }),
      'price': new FormControl(null, { validators: [Validators.required] }),
      'calory': new FormControl(null, { validators: [Validators.required] }),
      'imageUrl': new FormControl(null, { validators: [Validators.required] }),
      'description': new FormControl(null, { validators: [Validators.required] }),
      'ingredient': new FormControl()
    });
  }

  ngOnInit() {
    this.createForm();
  }

  onAdd() {
    const name = this.form.value.name;
    const type = this.form.value.type;
    const price = this.form.value.price;
    const calory = this.form.value.calory;
    const imageUrl = this.form.value.imageUrl;
    const description = this.form.value.description;
    const ingredients = this.form.value.ingredient;
    const productInfo: ProductModel =
    {
      name: name,
      type: type,
      price: price,
      calory: calory,
      imageUrl: imageUrl,
      description: description,
      ingredients: ingredients,
    }

    this.productService.createProduct(productInfo);

  }

}
