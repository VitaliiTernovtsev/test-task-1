import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DeveloperModel } from 'src/app/developer.model';
import { Versions } from 'src/app/versions';
import { EmailService } from 'src/app/services/email.service';
import { EmailValidator } from 'src/app/validators/email-validator';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-developer-form',
  templateUrl: './developer-form.component.html',
  styleUrls: ['./developer-form.component.scss']
})
export class DeveloperFormComponent implements OnInit {

  developerModelObj: DeveloperModel = new DeveloperModel();
  developerForm: FormGroup;
  versions: any = Versions;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
  ) { }

  ngOnInit(): void {

    this.developerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      framework: ['', [Validators.required]],
      frameworkVersion: [{
        value: '',
        disabled: true,
      }, [Validators.required]],
      email: ['', [Validators.required,], [EmailValidator.createValidator(this.emailService)]],
      hobby: this.formBuilder.array([]),
    });

    this.addHobby();

    this.developerForm.controls['framework'].valueChanges.subscribe(change => {
      this.developerForm.get('frameworkVersion')?.enable();
    });
  }

  addHobby() {
    const hobbyForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      duration: ['', [Validators.required]],
    });
    this.getHobby().push(hobbyForm);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  getHobby() {
    return <FormArray>this.developerForm.controls['hobby'];
  }

  send() {
    let convertDate = new Date(this.developerForm.value.dateOfBirth).toISOString().substring(0, 10);

    this.developerModelObj.firstName = this.developerForm.value.firstName;
    this.developerModelObj.lastName = this.developerForm.value.lastName;
    this.developerModelObj.dateOfBirth = convertDate;
    this.developerModelObj.framework = this.developerForm.value.framework;
    this.developerModelObj.frameworkVersion = this.developerForm.value.frameworkVersion;
    this.developerModelObj.email = this.developerForm.value.email;
    this.developerModelObj.hobby = this.developerForm.value.hobby;

    console.log(this.developerModelObj);

    this.developerForm.reset();
    this.developerForm.value.hobby = [];
  }

}
