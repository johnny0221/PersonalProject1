import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CartDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { message: string }) { }


  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
