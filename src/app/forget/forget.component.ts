import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetService } from './forget.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {

  constructor(private ForgetService: ForgetService, private dialog: MatDialog, private router: Router) { }

  form: FormGroup;
  isFetching: boolean;

  ngOnInit() {
    this.isFetching = false;
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      'email': new FormControl(null, { validators: [Validators.required, Validators.email] })
    })
  }

  onSubmit() {
    let email = this.form.value.email;
    this.isFetching = true;
    this.ForgetService.forgetpwd(email).subscribe((data) => {
      this.isFetching = false;
      this.dialog.open(ErrorDialogComponent, { data: { message: data.message, title: "Notification" } });
    });
  }

}
