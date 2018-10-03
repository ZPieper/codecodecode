import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-viewquotes',
  templateUrl: './viewquotes.component.html',
  styleUrls: ['./viewquotes.component.css']
})
export class ViewquotesComponent implements OnInit {
	quotes = [];
	current_author = {};

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  	this.current_author = {id: "", name: ""};
  	this.display();
  }

  display()
  {
	this._route.params.subscribe((params: Params) => {
  		let observable = this._httpService.getAuthorsQuotes(params['id']);
  		observable.subscribe((data2:any) => {
  		data2 = data2.json();
  		this.quotes = data2.author_quotes.quotes;
  		this.current_author = {id: data2.author_quotes._id, name: data2.author_quotes.name}
  		});
  	});
  }

  voteButton(event, num, id)
  {
  	console.log(num);
  	let observable = this._httpService.updateNum(num, id);
  	observable.subscribe((data2:any) => {
  		data2 = data2.json();
  		console.log(data2);
  		for (let i = 0; i < this.quotes.length; i++)
  		{
  			if (data2._id == this.quotes[i]._id)
  			{
  				this.quotes[i] = data2;
  			}
  		}
  		 this.display();
  	});
  }

  deleteQuoteButton(event, id)
  {
  	let observable = this._httpService.deleteAuthorQuote(id);
  	observable.subscribe(data2 => {
  		this.display();
  	});
  }

}
