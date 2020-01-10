import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetComponent } from './forget/forget.component';
import { ResetComponent } from './reset/reset.component';



const routes: Routes = [
    { path: '', component: ForgetComponent },
    { path: 'reset/:token', component: ResetComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
}
)

export class PasswordResetRoutingModule {

}