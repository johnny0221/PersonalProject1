import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ContactService } from './contact.service';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactService, private dialog: MatDialog) { }

  form: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      'firstName': new FormControl(null, { validators: [Validators.required] }),
      'lastName': new FormControl(null, { validators: [Validators.required] }),
      'email': new FormControl(null, { validators: [Validators.required, Validators.email] }),
      'description': new FormControl(null, { validators: [Validators.required] })
    })
  }

  onSubmit() {
    let userQuestion = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      description: this.form.value.description
    }
    this.contactService.sendMail(userQuestion).subscribe((data) => {
      this.dialog.open(ErrorDialogComponent, { data: { message: data.message, title: "提醒訊息 !" } });
    });
  }

}
