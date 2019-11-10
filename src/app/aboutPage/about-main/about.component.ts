import { Component, OnInit, OnDestroy } from '@angular/core';
import { aboutService } from '../about.service';
import { Subscription } from 'rxjs';
import { peopleModel } from '../../Interfaces/people.model';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  constructor(private aboutService: aboutService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  people: peopleModel[];
  aboutSub: Subscription;


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
    this.aboutSub = this.aboutService.peopleData.subscribe((peopleData) => {
      this.people = peopleData;
    })
    this.aboutService.getPeople();
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