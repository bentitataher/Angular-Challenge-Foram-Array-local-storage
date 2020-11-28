import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { PasswordValidator } from './shared/password.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  
  registrationForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    
    adresse: new FormGroup({
      numero: new FormControl(''),
      rue: new FormControl(''),
      ville: new FormControl(''),
      gouvernorat: new FormControl(''),
      pays: new FormControl(''),
      codePostal: new FormControl(''),
    }),
  
    
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
    confirmPassword: new FormControl(''),
    skills: new FormControl('', Validators.required),

    add_skills: new FormArray([]),

    exp_pro: new FormControl('', Validators.required),
    add_exp_pro:    new FormArray([]),

  }, {validators: PasswordValidator}); /* Fin - registrationForm */

 
  get add_skills(){ return this.registrationForm.get('add_skills') as FormArray };
  addSkills(){ this.add_skills.push(new FormControl('')) };
  suppSkills(i){ this.add_skills.removeAt(i) };

  get add_exp_pro(){ return this.registrationForm.get('add_exp_pro') as FormArray };
  addExpPro(){ this.add_exp_pro.push(new FormControl('')) };
  suppExpPro(i){ this.add_exp_pro.removeAt(i) };
  

  valider(){

    if(localStorage.getItem('users')==null){
      localStorage.setItem('users', JSON.stringify([this.registrationForm.value]))
    }

    else{
      let tab = JSON.parse(localStorage.getItem('users'));
      tab.push(this.registrationForm.value);
      localStorage.setItem('users',JSON.stringify(tab));
    }

  } /* Fin - valider */

  tab_2 = JSON.parse(localStorage.getItem('users'))



} /* Fin - export class AppComponent */
