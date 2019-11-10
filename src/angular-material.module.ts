import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatCardModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule 
    ],
    exports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule 
    ]
})
export class AngularMaterialModule {

}