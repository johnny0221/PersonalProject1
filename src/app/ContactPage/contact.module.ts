import { NgModule } from '@angular/core';
import { sharedModule } from '../shareComponent/shareComponent.module';
import { ContactPageComponent } from './contact-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { ContactRoutingModule } from './contact.routing.module';

@NgModule({
    declarations: [
        ContactPageComponent
    ],
    imports: [
        sharedModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        ContactRoutingModule
    ],

})
export class ContactModule { }