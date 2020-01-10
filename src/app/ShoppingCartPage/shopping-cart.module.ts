import { NgModule } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart.component';
import { sharedModule } from '../shareComponent/shareComponent.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { ShoppingCartRoutingModule } from './shopping-cart.routing.module';

@NgModule({
    declarations: [
        ShoppingCartComponent
    ],
    imports: [
        sharedModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        ShoppingCartRoutingModule
    ],

})
export class ShoppingCartModule { }