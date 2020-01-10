import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Activity } from '../activity.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

  constructor(private ActivityService: ActivityService, private route: ActivatedRoute) { }

  public TargetActivity: Observable<Activity>;
  private ActivityId: string;

  ngOnInit() {
    this.ActivityId = this.route.snapshot.paramMap.get('id');
    this.TargetActivity = this.ActivityService.getTargetActivity(this.ActivityId);
  }

}
