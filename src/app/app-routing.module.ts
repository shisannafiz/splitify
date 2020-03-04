import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { HomeComponent } from './components/home/home.component';
import { SelectComponent } from './components/select/select.component';
import { CreateComponent } from './components/create/create.component';
import { ChooseComponent } from './components/choose/choose.component';
import { StartComponent } from './components/start/start.component';
import { LoginComponent } from './components/login/login.component';
import { ReviewComponent } from './components/review/review.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '',        component: LoginComponent },
  { path: 'start',   component: InstructionsComponent },
  { path: 'select',  component: SelectComponent, canActivate: [AuthGuard] },
  { path: 'create',  component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'choose',  component: ChooseComponent, canActivate: [AuthGuard] },
  { path: 'confirm', component: StartComponent,  canActivate: [AuthGuard] },
  { path: 'home',    component: HomeComponent,   canActivate: [AuthGuard] },
  { path: 'review',  component: ReviewComponent, canActivate: [AuthGuard] },
  { path: '**',      redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
