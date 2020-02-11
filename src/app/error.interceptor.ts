import { Injectable } from "@angular/core";
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { MatDialog } from "@angular/material";
import { ErrorDialogComponent } from "./CustomDialogs/error-dialog/error-dialog.component";
import { Router } from "@angular/router";

@Injectable()
export class errorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(error => {
        let errorMsg = "An unknown error occurred";
        if (error.error.message) {
          errorMsg = error.error.message;
        }
        this.dialog.open(ErrorDialogComponent, {
          data: { message: errorMsg, title: "發生錯誤!" }
        });
        this.dialog.afterAllClosed.subscribe(() => {
          this.router.navigate(["/auth/login"]);
        });
        return throwError(error);
      })
    );
  }
}
