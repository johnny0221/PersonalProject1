import { Component, OnInit } from '@angular/core';
import { IUser } from '../user.model';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { authService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private authService: authService) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const username = this.form.get('name').value;
    const password = this.form.get('password').value;
    this.authService.login(username, password);
  }

  initForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

}
