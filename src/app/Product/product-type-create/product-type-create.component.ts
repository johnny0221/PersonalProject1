import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-type-create',
  templateUrl: './product-type-create.component.html',
  styleUrls: ['./product-type-create.component.scss']
})
export class ProductTypeCreateComponent implements OnInit {

  form: FormGroup;
  IngredientSub: Subscription

  constructor(private productService: ProductService) { }

  initForm() {
    this.form = new FormGroup({
      'ingredients': new FormArray([])
    })
  }

  ngOnInit() {
    this.initForm();
    this.IngredientSub = this.productService.getIngredient().subscribe((data) => {
      const ingredients = data.ingredients;
      for (const ingredient of ingredients) {
        (<FormArray>this.form.get('ingredients')).controls.push(new FormGroup({ 'name': new FormControl(ingredient, Validators.required) }));
      }
    });
  }

  onAddIngredient() {
    (<FormArray>this.form.get('ingredients')).controls.push(new FormGroup({ 'name': new FormControl(null, Validators.required) }));
  }

  getControls() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  deleteIngredient(i: number) {
    (<FormArray>this.form.get('ingredients')).controls.splice(i, 1);
  }

  onSave() {
    let i = []
    for (const ingredient of (<FormArray>this.form.controls.ingredients).controls) {
      i.push(ingredient.value.name);
    }
    this.productService.updateIngredient(i);

  }

  ngOnDestroy() {
    this.IngredientSub.unsubscribe();
  }

}
