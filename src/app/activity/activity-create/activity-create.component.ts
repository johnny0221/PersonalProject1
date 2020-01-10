import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivityService } from '../activity.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss']
})
export class ActivityCreateComponent implements OnInit {

  public form: FormGroup;
  public isLoading: boolean = false;
  private isEditMode: boolean = false;
  private ActivityId: string;
  private TargetActivty: { name: string, DateStart: Date, DateEnd: Date, image: string, description: string };

  constructor(private ActivityService: ActivityService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isEditMode = true;
        this.ActivityId = paramMap.get('id');
        this.ActivityService.getTargetActivity(this.ActivityId).subscribe((data) => {
          this.TargetActivty = {
            name: data.name,
            DateStart: data.DateStart,
            DateEnd: data.DateEnd,
            image: data.image,
            description: data.description
          }
          this.form.setValue(this.TargetActivty);
        });
      }
    })
  }

  initForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, { validators: [Validators.required] }),
      'DateStart': new FormControl(null, { validators: [Validators.required] }),
      'DateEnd': new FormControl(null, { validators: [Validators.required] }),
      'image': new FormControl(null, { validators: [Validators.required] }),
      'description': new FormControl(null, { validators: [Validators.required] })
    }, this.DateChecker)
  }

  onSubmit() {
    this.isLoading = true
    let activityInfo = {
      name: this.form.value.name,
      DateStart: new Date(this.form.value.DateStart),
      DateEnd: new Date(this.form.value.DateEnd),
      image: this.form.value.image,
      description: this.form.value.description
    }
    if (this.isEditMode) {
      this.ActivityService.updateTargetActivity(this.ActivityId, activityInfo).subscribe((message) => {
        this.isLoading = false;
        this.router.navigate(['/activity']);
      });
    } else {
      this.ActivityService.CreateActivity(activityInfo).subscribe((message) => {
        this.isLoading = false;
        this.router.navigate(['/activity']);
      })
    }
  }

  //custom confirm password validator
  DateChecker = (c: AbstractControl): { [key: string]: boolean } | null => {
    const StartControl = c.get('DateStart');
    const EndControl = c.get('DateEnd');
    const Start = new Date(StartControl.value).getTime();
    const End = new Date(EndControl.value).getTime();

    if (EndControl.pristine || StartControl.pristine) {
      return null;
    }

    if (End > Start) {
      // return if another validator has already found an error on the matchingControl
      return null;
    }

    return { 'match': true };
  }


}
