import { Component, OnInit, OnDestroy } from '@angular/core';
import { aboutService } from '../about.service';
import { Subscription } from 'rxjs';
import { peopleModel } from '../../Interfaces/people.model';
import { ConfirmComponent } from '../../CustomDialogs/confirm-dialog/confirm.component';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { authService } from '../../auth/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  constructor(
    private aboutService: aboutService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private authService: authService
  ) { }

  people: peopleModel[];
  aboutSub: Subscription;
  checkAdminStatus;


  openDialog(id: string, name: string): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: { message: `確定要將人員: ${name} 給刪除嗎?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.aboutService.deletePerson(id).subscribe((message) => {
          this.aboutService.getPeople();
        });
      } else {
        return;
      }
    });
  }


  ngOnInit() {
    //get data of people
    this.aboutSub = this.aboutService.peopleData.subscribe((peopleData) => {
      this.people = peopleData;
    })
    this.aboutService.getPeople();
    //auth check
    this.checkAdminStatus = this.authService.getAdminStatus()
  }

  onEdit(id: string) {
    this.router.navigate([`people/${id}/edit`]);
  }

  onDelete(id: string, name: string) {
    this.openDialog(id, name);
  }

  ngOnDestroy() {
    this.aboutSub.unsubscribe();
  }

}
//[routerLink]="['/people/edit', person._id]"