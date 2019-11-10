import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { aboutService } from '../about.service';
import { peopleModel } from '../../Interfaces/people.model';

@Component({
  selector: 'app-about-create',
  templateUrl: './about-create.component.html',
  styleUrls: ['./about-create.component.scss']
})
export class AboutCreateComponent implements OnInit {

  constructor(private aboutService: aboutService, private route: ActivatedRoute, private router: Router) { }

  private isEditMode = false;
  personId: string;
  form: FormGroup;
  targetPerson: peopleModel = { name: "", age: null, image: "", position: "", text: "" };

  //creating blank form.
  createFormGroup() {
    this.form = new FormGroup({
      'name': new FormControl(null, { validators: [Validators.required] }),
      'position': new FormControl(null, { validators: [Validators.required] }),
      'imageURL': new FormControl(null, { validators: [Validators.required] }),
      'age': new FormControl(null, { validators: [Validators.required] }),
      'description': new FormControl(null, { validators: [Validators.required] })
    });
  }

  ngOnInit() {
    this.createFormGroup();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isEditMode = true;
        this.personId = paramMap.get('id');
        this.aboutService.getTargetPerson(this.personId).subscribe((person) => {
          this.targetPerson = {
            name: person.data.name,
            age: person.data.age,
            position: person.data.position,
            image: person.data.image,
            text: person.data.text
          };
          this.form.setValue(
            {
              name: this.targetPerson.name,
              age: this.targetPerson.age,
              position: this.targetPerson.position,
              imageURL: this.targetPerson.image,
              description: this.targetPerson.text
            }
          );
        });
      } else {
        this.targetPerson = null;
      }
    });
  }

  onAdd() {
    const name = this.form.value.name;
    const age = this.form.value.age;
    const position = this.form.value.position;
    const imageURL = this.form.value.imageURL;
    const description = this.form.value.description;
    const person: peopleModel = { name: name, position: position, age: age, image: imageURL, text: description };
    if (this.isEditMode) {
      this.aboutService.updateTargetPerson(this.personId, person)
    } else {
      this.aboutService.createPerson(person);
    }
  }

}
