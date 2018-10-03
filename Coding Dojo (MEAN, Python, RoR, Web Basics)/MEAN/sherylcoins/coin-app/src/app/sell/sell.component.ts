import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
	bank: number;
	currentValue: number;
	selling: any;
  message: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  	this.bank = this._httpService.coins_owned;
  	this.currentValue = this._httpService.value;
  	this.selling = {input: 0};
    this.message = {text: ""};
  }

  sell(event){
  	event.preventDefault();
  	if (((this.bank - this.selling.input) >= 0) && ((this.selling.input % 1) == 0))
  	{
  		let observable = this._httpService.buttonSell(this.selling.input);
  		this.bank = this._httpService.coins_owned;
  		this.currentValue = this._httpService.value;
  		this.selling.input = 0;
      this.message.text = "";
  	}
  	else
  	{
      this.selling.input = 0;
      this.message.text = "You can't sell that amount!";
  	}
  }

}
