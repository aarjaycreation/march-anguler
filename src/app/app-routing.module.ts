import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './MyComponent/add/add.component';
import { ListComponent } from './MyComponent/list/list.component';

const routes: Routes = [

  {path: 'Register', component:AddComponent,pathMatch: "full"},
  {path: 'ViewDetails', component:ListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
