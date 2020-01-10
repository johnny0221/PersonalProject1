import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductMainComponent } from './product-main/product-main.component';
import { ProductDessertsComponent } from './product-desserts/product-desserts.component';
import { ProductComponent } from './product/product.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductTypeCreateComponent } from './product-type-create/product-type-create.component';
import { ProductItemComponent } from './product-item/product-item.component';




const routes: Routes = [
    { path: 'create', component: ProductCreateComponent },
    { path: ':id/edit', component: ProductCreateComponent },
    { path: 'ingredient/create', component: ProductTypeCreateComponent },
    {
        path: '', component: ProductComponent, data: { depth: 2 }, children: [
            { path: '', component: ProductMainComponent },
            { path: 'drinks', component: ProductDessertsComponent, data: { depth: 3 } },
            { path: 'desserts', component: ProductDessertsComponent, data: { depth: 3 } },
            { path: 'lightmeals', component: ProductDessertsComponent, data: { depth: 3 } },
            { path: ':id', component: ProductItemComponent }
        ]
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
}
)

export class ProductRoutingModule {

}