import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl

  constructor( private http: HttpClient ) { }

   getUsers() {
    return this.http.get(this.url + '/user')
   }
   createUser(param: any) {
    return this.http.post(this.url + '/user/store', param)
   }
   updateUser(param: any) {
    return this.http.post(this.url + '/user/update', param)
   }
   deleteUser(param: any) {
    return this.http.post(this.url + '/user/delete', param)
   }
}
