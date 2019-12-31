import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatCardModule, MatDialogModule, MatSelectModule, MatListModule, } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        MatSelectModule,
        MatListModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSidenavModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        MatSelectModule,
        MatListModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSidenavModule
    ]
})
export class AngularMaterialModule {

}