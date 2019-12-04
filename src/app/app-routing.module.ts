import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { HomeComponent } from './components/home/home.component';
import { SelectComponent } from './components/select/select.component';
import { CreateComponent } from './components/create/create.component';
import { ChooseComponent } from './components/choose/choose.component';
import { StartComponent } from './components/start/start.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '',   component: InstructionsComponent },
  { path: 'home',   component: HomeComponent },
  { path: 'select',   component: SelectComponent },
  { path: 'create',   component: CreateComponent },
  { path: 'choose',   component: ChooseComponent },
  { path: 'start',   component: StartComponent },
  { path: 'login',   component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
