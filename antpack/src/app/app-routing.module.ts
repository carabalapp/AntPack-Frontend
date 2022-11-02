import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MasterUserComponent } from './views/users/master-user/master-user.component';
const routes : Routes = [
  { path: '', redirectTo: '/home', pathMatch:'full' },
  { path: 'home', component: MasterUserComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
