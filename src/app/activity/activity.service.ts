import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Activity {
    name: string;
    DateStart: Date,
    DateEnd: Date,
    image: string,
    description: string
}

@Injectable({ providedIn: 'root' })
export class ActivityService {

    constructor(private router: Router, private http: HttpClient) { }

    ActivityData: Activity[];
    private ActivitySubject: BehaviorSubject<{ Activity: Activity[], maxlength: number }> = new BehaviorSubject(null);

    ActivitySubjectListener() {
        return this.ActivitySubject.asObservable();
    }

    GetActivity(PageSize?: number, currentPage?: number) {
        let queryParams = `?pagesize=${PageSize}&currentpage=${currentPage}`;
        this.http.get<{ data: Activity[], maxlength: number }>(`http://localhost:3000/activity${queryParams}`).subscribe((data) => {
            this.ActivityData = data.data;
            this.ActivitySubject.next({ Activity: [...this.ActivityData], maxlength: data.maxlength });
        });
    }

    CreateActivity(Activity: Activity) {
        return this.http.post<{ message: string }>('http://localhost:3000/activity', Activity);
    }

    getTargetActivity(ActivityId: string) {
        return this.http.get<Activity>(`http://localhost:3000/activity/${ActivityId}`);
    }

    updateTargetActivity(ActivityId: string, newActivity: Activity) {
        return this.http.put<{ message: string }>(`http://localhost:3000/activity/${ActivityId}`, newActivity);
    }

    deleteTargetActivity(ActivityId: string) {
        return this.http.delete<{ message: string }>(`http://localhost:3000/activity/${ActivityId}`);
    }

}