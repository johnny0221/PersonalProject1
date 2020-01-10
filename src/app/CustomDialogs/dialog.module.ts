import { NgModule } from '@angular/core';
import { sharedModule } from '../shareComponent/shareComponent.module';
import { ConfirmComponent } from '../CustomDialogs/confirm-dialog/confirm.component';
import { ErrorDialogComponent } from '../CustomDialogs/error-dialog/error-dialog.component';
import { CommentDialogComponent } from '../CustomDialogs/comment-dialog/comment-dialog.component';
import { CartDialogComponent } from '../CustomDialogs/cart-dialog/cart-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ConfirmComponent,
        ErrorDialogComponent,
        CommentDialogComponent,
        CartDialogComponent
    ],
    imports: [
        sharedModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        RouterModule
    ],
    entryComponents: [
        ConfirmComponent,
        ErrorDialogComponent,
        CommentDialogComponent,
        CartDialogComponent
    ]

})
export class DialogModule { }