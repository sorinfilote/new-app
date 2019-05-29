import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {BoardsComponent} from './boards/boards.component';
import {AuthGuard} from './auth/auth.guard';
import {LoggedinGuard} from './auth/loggedin.guard';
import {BoardsDetailsComponent} from './boards/boards-details/boards-details.component';
import {CardsDetailsComponent} from './cards/cards-details/cards-details.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoggedinGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoggedinGuard]},
  {path: 'boards', component: BoardsComponent, canActivate: [AuthGuard]},
  {path: 'boards/:id', component: BoardsDetailsComponent, canActivate: [AuthGuard]},
  // {path: 'cards/:list_id/:id', component: CardsDetailsComponent, canActivate: [AuthGuard]},
  {path:'**', redirectTo: 'boards'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
