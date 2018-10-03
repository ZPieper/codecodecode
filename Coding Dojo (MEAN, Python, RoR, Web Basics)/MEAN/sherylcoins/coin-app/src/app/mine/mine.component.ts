import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {
	bank: number;
	entry: any;
  message: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  	this.bank = this._httpService.coins_owned;
  	this.entry = {input: ""};
    this.message = {text: ""};
  }

  mine(event) {
  	event.preventDefault();
  	if(this.entry.input == 3 || this.entry.input.toLowerCase() == "three")
  	{
  		let observable = this._httpService.buttonMine(this.entry.input);
  		this.bank = this._httpService.coins_owned;
  		this.entry.input = "";
      this.message.text = "That's correct! You've mined 1 coin.";
  	}
  	else
  	{
      this.entry.input = "";
      this.message.text = "That's not right.";
  	}
  }

}
