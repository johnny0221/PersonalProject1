import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { peopleModel } from '../Interfaces/people.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class aboutService {

    constructor(private http: HttpClient, private router: Router) { }

    people: peopleModel[] = [];
    peopleData: Subject<peopleModel[]> = new Subject<peopleModel[]>();

    getPeople() {
        this.http.get<{ data: peopleModel[] }>("http://localhost:3000/people").subscribe((people) => {
            console.log(people);
            this.people = people.data;
            this.peopleData.next([...this.people]);
        })
    }

    getTargetPerson(id: string) {
        return this.http.get<{ data: peopleModel }>(`http://localhost:3000/people/${id}`);
    }

    updateTargetPerson(id: string, people: peopleModel) {
        const personInfo = { id: id, name: people.name, position: people.position, age: people.age, image: people.image, description: people.text };
        this.http.put<{ message: string }>(`http://localhost:3000/people/${id}`, personInfo).subscribe(
            (message) => {
                this.router.navigate(["/chinese/about"]);
            })
    }

    createPerson(people: peopleModel) {
        const newPerson = { ...people };
        this.http.post<{ message: string }>("http://localhost:3000/people", newPerson).subscribe(
            (message) => {
                this.router.navigate(["/chinese/about"]);
            });
    }

    deletePerson(id: string) {
        return this.http.delete<{ message: string }>(`http://localhost:3000/people/${id}`);
    }
}