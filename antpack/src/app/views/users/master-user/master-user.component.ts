import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-master-user',
  templateUrl: './master-user.component.html',
  styleUrls: ['./master-user.component.css']
})
export class MasterUserComponent implements OnInit {
  users: any
  user: any = {}
  modalOption: string = ''

  userForm: FormGroup = new FormGroup({
    id: new FormControl(""),
    name: new FormControl("", { validators: Validators.required }),
    username: new FormControl("", { validators: Validators.required }),
    email: new FormControl("", { validators: Validators.required }),
    street: new FormControl("", { validators: Validators.required }),
    suite: new FormControl("", { validators: Validators.required }),
    city: new FormControl("", { validators: Validators.required }),
    zipcode: new FormControl("", { validators: Validators.required }),
    phone: new FormControl("", { validators: Validators.required }),
    website: new FormControl("", { validators: Validators.required }),
    lat: new FormControl("", { validators: Validators.required }),
    lng: new FormControl("", { validators: Validators.required }),
    company_id: new FormControl(""),
    company_name: new FormControl("", { validators: Validators.required }),
    company_catchPhrase: new FormControl("", { validators: Validators.required }),
    company_bs: new FormControl("", { validators: Validators.required }),
});

  constructor(private UserServices: UserService) { }

  ngOnInit(): void {
    this.getUsers()
  }


  getUsers(){
    this.UserServices.getUsers().subscribe( res => {
      this.users = res
    },
    err => console.log(err))
  }
  createUser(user: any){
    if(this.userForm.status === 'INVALID') return alert('Todos los campos son obligatorios')
    this.UserServices.createUser(user).subscribe( res => {
      console.log('Usuario --->',res);
      this.users.push(res)
    },
    err => console.log(err))
  }
  updateUser(user: any){
    this.modalOption = 'create'
    if(this.userForm.status === 'INVALID') return alert('Todos los campos son obligatorios')
    this.UserServices.updateUser(user).subscribe( res => {
      console.log('Usuario --->',res);
      this.users.push(res)
    },
    err => console.log(err))
  }

  delete(id: any){
    let obj = {
      id: id
    }

    this.UserServices.deleteUser(obj).subscribe( res => {
      // Quitando elemento del array principal.
      this.users = this.users.filter( (x: { id: Object; }) => x.id != res)
    },
    err => console.log(err))
  }
  
  edit(user: any){
    console.log(user);
    this.modalOption = 'edit'
    this.userForm.patchValue({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      street: user.address.street,
      suite: user.address.suite,
      city: user.address.city,
      zipcode: user.address.zipcode,
      phone: user.phone,
      website: user.website,
      lat: user.address.geo.lat,
      lng: user.address.geo.lng,
      company_id: user.Company.id,
      company_name: user.Company.name,
      company_catchPhrase: user.Company.catchPhrase,
      company_bs: user.Company.bs
    })
  }

  create(){
    this.modalOption = 'create'
  }

  submit(){
    console.log(this.userForm);
    this.setForm(this.userForm);
    this.createUser(this.user);
    this.clear();
  }
  update(){
    console.log(this.userForm);
    this.setForm(this.userForm);
    this.updateUser(this.user);
    this.clear();
  }
  clear(){
    this.userForm.reset();
  }


  // Aqui estoy contruyendo el objeto que enviare al backend con su estructura.
  setForm(form: any){
    if(form.value.id !== ''){
      this.user.id = form.value.id
    }
    this.user.name = form.value.name
    this.user.username = form.value.username
    this.user.email = form.value.email
    this.user.address = {
      street: form.value.street,
      suite: form.value.suite,
      city: form.value.city,
      zipcode: form.value.zipcode,
      geo: {
        lat: form.value.lat,
        lng: form.value.lng
      }
    }
    this.user.phone = form.value.phone
    this.user.website = form.value.website
    this.user.company = {
      name: form.value.company_name,
      catchPhrase: form.value.company_catchPhrase,
      bs: form.value.company_bs
    }
    if(form.value.company_id !== ''){
      this.user.company.id = form.value.company_id
    }
  }
}
