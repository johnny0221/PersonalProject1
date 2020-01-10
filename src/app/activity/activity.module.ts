import { NgModule } from '@angular/core';
import { sharedModule } from '../shareComponent/shareComponent.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { ActivityComponent } from './activity.component';
import { ActivityRoutingModule } from './activity.routing.module';
import { ActivityCreateComponent } from './activity-create/activity-create.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';


@NgModule({
    declarations: [
        ActivityComponent,
        ActivityCreateComponent,
        ActivityDetailComponent
    ],
    imports: [
        sharedModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        ActivityRoutingModule
    ],

})
export class ActivityModule { }