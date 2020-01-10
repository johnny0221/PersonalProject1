import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { sharedModule } from '../shareComponent/shareComponent.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { AuthRoutingModule } from './auth.routing.module';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        sharedModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        AuthRoutingModule
    ],

})
export class AuthModule { }