import { NgModule } from '@angular/core';
import { ForgetComponent } from './forget/forget.component';
import { ResetComponent } from './reset/reset.component';
import { sharedModule } from '../shareComponent/shareComponent.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { PasswordResetRoutingModule } from './PasswordReset.routing.module';

@NgModule({
    declarations: [
        ForgetComponent,
        ResetComponent
    ],
    imports: [
        sharedModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        PasswordResetRoutingModule
    ],

})
export class PasswordResetModule { }