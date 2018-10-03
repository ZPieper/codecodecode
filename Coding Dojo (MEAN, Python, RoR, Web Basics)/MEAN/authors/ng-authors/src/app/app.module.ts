import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateauthComponent } from './createauth/createauth.component';
import { EditauthComponent } from './editauth/editauth.component';
import { ViewquotesComponent } from './viewquotes/viewquotes.component';
import { CreatequotesComponent } from './createquotes/createquotes.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateauthComponent,
    EditauthComponent,
    ViewquotesComponent,
    CreatequotesComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
