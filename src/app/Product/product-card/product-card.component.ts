import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../../Interfaces/product.model';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../confirm-dialog/confirm.component';
import { MatDialog } from '@angular/material';
import { ProductService } from '../product.service';
import { authService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductModel
  checkAdminStatus;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private productService: ProductService,
    private authService: authService
  ) { }

  ngOnInit() {
    this.checkAdminStatus = this.authService.getAdminStatus();
  }

  onEdit(id: string) {
    this.router.navigate([`product/${id}/edit`]);
  }

  onDelete(id: string, name: string) {
    this.openDialog(id, name);
  }

  toItem(id: string) {
    this.router.navigate([`/chinese/product/${id}`]);
  }

  openDialog(id: string, name: string, ): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: { message: `確定要將商品: ${name} 給刪除嗎?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const currentType = this.product.type;
        this.productService.deleteProduct(id, currentType);
      } else {
        return;
      }
    });
  }

}
