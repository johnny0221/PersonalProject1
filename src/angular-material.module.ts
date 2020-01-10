import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatCardModule, MatDialogModule, MatSelectModule, MatListModule, } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';



@NgModule({
    imports: [
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        MatSelectModule,
        MatListModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        MatSelectModule,
        MatListModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class AngularMaterialModule {

}