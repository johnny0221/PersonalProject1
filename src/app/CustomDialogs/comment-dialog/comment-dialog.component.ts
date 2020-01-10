import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public route: ActivatedRoute) { }

  form: FormGroup;


  ngOnInit() {
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  initForm() {
    this.form = new FormGroup({
      'comment': new FormControl(null, [Validators.required, Validators.maxLength(500)])
    });
  }

}
