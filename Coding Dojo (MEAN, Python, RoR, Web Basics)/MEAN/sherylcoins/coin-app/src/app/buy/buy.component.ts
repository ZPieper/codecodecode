import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
	bank: number;
	currentValue: number;
	purchase: any;
  message: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  	this.bank = this._httpService.coins_owned;
  	this.currentValue = this._httpService.value;
  	this.purchase = {input: 0};
    this.message = {text: ""};
  }

  buy(event){
  	event.preventDefault();
  	if (((this.currentValue - this.purchase.input) >= 0) && (this.purchase.input % 1 == 0))
  	{
  		let observable = this._httpService.buttonBuy(this.purchase.input);
  		this.bank = this._httpService.coins_owned;
  		this.currentValue = this._httpService.value;
  		this.purchase.input = 0;
      this.message.text = "";
  	}
  	else
  	{
      this.purchase.input = 0;
      this.message.text = "You can't buy that amount!";
  	}
  }

}