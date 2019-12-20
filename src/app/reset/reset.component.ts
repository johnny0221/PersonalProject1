import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';
import { ResetService } from './reset.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private resetService: ResetService) { }

  form: FormGroup;
  resetToken: string;
  isLoading: boolean;

  ngOnInit() {
    this.isLoading = false;
    this.initForm();
    this.resetToken = this.route.snapshot.paramMap.get('token');
    this.resetService.isPermitted(this.resetToken).subscribe((data) => {
      console.log(data);
    })
  }

  initForm() {
    this.form = new FormGroup({
      'password': new FormControl(null, { validators: [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)] }),
      'confirmpassword': new FormControl(null, { validators: [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)] })
    }, this.confirm)
  }

  onSubmit() {
    this.isLoading = true;
    const newpassword = this.form.value.password;
    const token = this.resetToken;
    this.resetService.resetPassword(newpassword, token).subscribe(data => {
      this.isLoading = false;
      this.dialog.open(ErrorDialogComponent, { data: { message: data.message, title: "Notification" } });
      this.dialog.afterAllClosed.subscribe(() => {
        this.router.navigate(['/chinese']);
      });
    });
  }

  //this custom validator is for the whole form
  confirm = (c: AbstractControl): { [key: string]: boolean } | null => {
    const passwordControl = c.get('password');
    const confirmControl = c.get('confirmpassword');

    if (confirmControl.errors && !confirmControl.errors.match) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    if (passwordControl.pristine || confirmControl.pristine) {
      return null;
    }

    if (passwordControl.value === confirmControl.value) {
      return null;
    }
    return { 'match': true };
  }

}
