import { NgModule } from '@angular/core';
import { ProductMainComponent } from './product-main/product-main.component';
import { ProductDessertsComponent } from './product-desserts/product-desserts.component';
import { ProductComponent } from './product/product.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductTypeCreateComponent } from './product-type-create/product-type-create.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { sharedModule } from '../shareComponent/shareComponent.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { ProductRoutingModule } from './product.routing.module';
@NgModule({
    declarations: [
        ProductMainComponent,
        ProductDessertsComponent,
        ProductComponent,
        ProductCreateComponent,
        ProductCardComponent,
        ProductTypeCreateComponent,
        ProductItemComponent
    ],
    imports: [
        sharedModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        ProductRoutingModule
    ],

})
export class ProductModule { }