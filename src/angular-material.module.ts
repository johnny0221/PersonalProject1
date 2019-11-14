import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatCardModule, MatDialogModule, MatSelectModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        MatSelectModule,
        MatListModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        MatSelectModule,
        MatListModule
    ]
})
export class AngularMaterialModule {

}