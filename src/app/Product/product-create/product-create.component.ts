import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProductModel } from '../../Interfaces/product.model';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  isEditMode = false;
  productId: string;
  form: FormGroup;
  types: string[] = ['drinks', 'desserts', 'lightmeals'];
  ingredients: string[];
  IngredientSub: Subscription;

  createForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, { validators: [Validators.required] }),
      'type': new FormControl(null, { validators: [Validators.required] }),
      'price': new FormControl(null, { validators: [Validators.required] }),
      'calory': new FormControl(null, { validators: [Validators.required] }),
      'imageUrl': new FormControl(null, { validators: [Validators.required] }),
      'description': new FormControl(null, { validators: [Validators.required] }),
      'ingredient': new FormControl()
    });
  }

  ngOnInit() {
    this.createForm();
    this.IngredientSub = this.productService.getIngredient().subscribe((data) => {
      this.ingredients = [...data.ingredients];
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isEditMode = true;
        this.productId = paramMap.get('id');
        this.productService.getTargetProduct(this.productId)
        this.productService.TargetProductSubListener().subscribe((data) => {
          const targetProduct = {
            name: data.data.name,
            type: data.data.type,
            price: data.data.price,
            calory: data.data.calory,
            imageUrl: data.data.imageUrl,
            description: data.data.description,
            ingredient: data.data.ingredients
          }
          this.form.setValue({
            name: targetProduct.name,
            type: targetProduct.type,
            price: targetProduct.price,
            calory: targetProduct.calory,
            imageUrl: targetProduct.imageUrl,
            description: targetProduct.description,
            ingredient: targetProduct.ingredient
          });
        });
      }
    });
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
    if (this.isEditMode) {
      this.productService.updateTargetProduct(this.productId, productInfo);
    } else {
      this.productService.createProduct(productInfo);
    }

  }

  ngOnDestroy() {
    this.IngredientSub.unsubscribe();
  }

}
