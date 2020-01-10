import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivityService } from './activity.service';
import { authService } from '../auth/auth.service';
import { Activity } from './activity.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../CustomDialogs/confirm-dialog/confirm.component';
import { MatDialog, PageEvent } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  constructor(
    private ActivityService: ActivityService,
    private router: Router,
    private dialog: MatDialog,
    private AuthService: authService
  ) { }



  public ActivityData: Observable<{ Activity: Activity[], maxlength: number }>;
  public isLoading: boolean = false;
  public checkAdminStatus: Observable<boolean>;
  //pagination data
  private currentPage = 1;
  public pageSize = 5;
  public pageSizeOptions = [5, 10];
  //start from
  public pageIndex = 0;



  ngOnInit() {
    this.checkAdminStatus = this.AuthService.getAdminStatus();
    this.ActivityService.GetActivity(this.pageSize, this.currentPage);
    this.ActivityData = this.ActivityService.ActivitySubjectListener();
  }

  onEdit(ActivityId: string) {
    this.router.navigate([`/activity/edit/${ActivityId}`]);
  }

  onDelete(ActivityId: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: { message: `確定要將此活動刪除嗎?` }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.ActivityService.deleteTargetActivity(ActivityId).subscribe((message) => {
          this.ActivityService.GetActivity(this.pageSize, 1);
        });
      } else {
        return;
      }
    });
  }

  changePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.pageIndex = pageData.pageIndex;
    this.ActivityService.GetActivity(this.pageSize, this.currentPage);
  }

}
