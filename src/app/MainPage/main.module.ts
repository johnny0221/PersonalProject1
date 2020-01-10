import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MainProductComponent } from './main-product/main-product.component';
import { MainFeatureComponent } from './main-feature/main-feature.component';
import { sharedModule } from '../shareComponent/shareComponent.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { MainRoutingModule } from './main.routing.module';

@NgModule({
    declarations: [
        MainComponent,
        MainProductComponent,
        MainFeatureComponent
    ],
    imports: [
        sharedModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        MainRoutingModule
    ],

})
export class MainPageModule { }