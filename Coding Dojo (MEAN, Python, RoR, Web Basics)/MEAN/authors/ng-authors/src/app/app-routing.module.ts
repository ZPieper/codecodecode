import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { CreateauthComponent } from "./createauth/createauth.component";
import { EditauthComponent } from "./editauth/editauth.component";
import { ViewquotesComponent } from "./viewquotes/viewquotes.component";
import { CreatequotesComponent } from "./createquotes/createquotes.component";

const routes: Routes = [
{ path: '',component: HomeComponent },
{ path: 'new',component: CreateauthComponent },
{ path: 'edit/:id',component: EditauthComponent },
{ path: 'quotes/:id',component: ViewquotesComponent },
{ path: 'write/:id',component: CreatequotesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
