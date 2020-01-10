import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AboutCreateComponent } from './about-create/about-create.component';

const routes: Routes = [
    { path: '', component: AboutComponent, data: { depth: 2 } },
    { path: 'create', component: AboutCreateComponent },
    { path: ':id/edit', component: AboutCreateComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
}
)

export class AboutRoutingModule {

}