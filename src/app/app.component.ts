import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public form: FormGroup;
  public contactList: FormArray;

  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get('contacts') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      contacts: this.fb.array([this.createContact()])
    });

    // set contactlist to this field
    this.contactList = this.form.get('contacts') as FormArray;
  }

  // contact formgroup
  createContact(): FormGroup {
    return this.fb.group({
      type: ['email', Validators.compose([Validators.required])], // i.e Email, Phone
      name: [null, Validators.compose([Validators.required])], // i.e. Home, Office
      value: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  // add a contact form group
  addContact() {
    this.contactList.push(this.createContact());
  }

  // remove contact from group
  removeContact(index) {
    // this.contactList = this.form.get('contacts') as FormArray;
    this.contactList.removeAt(index);
  }


  // get the formgroup under contacts form array
  getContactsFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.contactList.controls[index] as FormGroup;
    return formGroup;
  }

  // method triggered when form is submitted
  submit() {
    console.log(this.form.value);
  }
}
