import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable()
export class errorInterceptor implements HttpInterceptor {

    constructor(private dialog: MatDialog) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError(error => {
                let errorMsg = 'An unknown error occurred';
                if (error.error.message) {
                    errorMsg = error.error.message;
                }
                this.dialog.open(ErrorDialogComponent, { data: { message: errorMsg } });
                return throwError(error);
            })
        )
    }
}