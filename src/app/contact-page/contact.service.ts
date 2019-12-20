import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { questionModel } from '../Interfaces/question.model';

@Injectable({ providedIn: 'root' })
export class ContactService {

    constructor(private http: HttpClient) { }

    sendMail(data: questionModel) {
        return this.http.post<{ message: string }>('http://localhost:3000/sendquestion', data);
    }
}