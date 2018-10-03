import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from "./home/home.component";
import { MineComponent } from "./mine/mine.component";
import { BuyComponent } from "./buy/buy.component";
import { SellComponent } from "./sell/sell.component";
import { BrowseComponent } from "./browse/browse.component";
import { TransactionComponent } from "./transaction/transaction.component";

@NgModule({
  declarations: [
    AppComponent, HomeComponent, MineComponent, BuyComponent, SellComponent, BrowseComponent, TransactionComponent
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
