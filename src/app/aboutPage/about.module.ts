import { NgModule } from '@angular/core';
import { sharedModule } from '../shareComponent/shareComponent.module';
import { AboutComponent } from './about/about.component';
import { AboutCreateComponent } from './about-create/about-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { AboutRoutingModule } from './about.routing.module';

@NgModule({
    declarations: [
        AboutComponent,
        AboutCreateComponent
    ],
    imports: [
        sharedModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        AboutRoutingModule,
    ],

})
export class AboutModule { }
