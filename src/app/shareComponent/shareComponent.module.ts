import { NavbarComponent } from '../shareComponent/template/navbar.component';
import { FooterComponent } from '../shareComponent/footer/footer.component';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent
    ],
    imports: [
        AngularMaterialModule,
        RouterModule,
        CommonModule
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        CommonModule
    ],
})

export class sharedModule {

}