import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityCreateComponent } from './activity-create/activity-create.component';
import { ActivityComponent } from './activity.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';


const routes: Routes = [
    { path: '', component: ActivityComponent },
    { path: 'create', component: ActivityCreateComponent },
    { path: 'edit/:id', component: ActivityCreateComponent },
    { path: ':id', component: ActivityDetailComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
}
)

export class ActivityRoutingModule {

}