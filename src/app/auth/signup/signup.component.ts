import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IUser } from '../user.model';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { authService } from '../auth.service';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, switchMap, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  @ViewChild('input', { static: false }) input;

  constructor(private authService: authService) { }

  form: FormGroup;
  duplicateName: boolean;
  userNameCheckSub: Subscription;

  initForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      'confirm': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
    }, this.confirm)
  }

  onAdd() {
    const name = this.form.get('name').value;
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    const user = { name, email, password };
    this.authService.createUser(user);

  }

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    this.userNameCheckSub = fromEvent(this.input.nativeElement, 'input')
      .pipe(
        debounceTime(1000),
        map((data: any) => {
          return data.target.value.length;
        }),
        filter(data => data >= 3),
        switchMap(() => {
          return this.authService.checkUserName();
        })
      ).subscribe((data: any) => {
        let userList: string[] = [];
        for (const user of data.data) {
          userList.push(user.name);
        }
        if (userList.indexOf(this.input.nativeElement.value) === -1) {
          this.duplicateName = false;
        } else {
          this.duplicateName = true;
        }
      })


  }


  //custom confirm password validator
  confirm = (c: AbstractControl): { [key: string]: boolean } | null => {
    const passwordControl = c.get('password');
    const confirmControl = c.get('confirm');

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

  ngOnDestroy() {
    this.userNameCheckSub.unsubscribe();
  }


}
