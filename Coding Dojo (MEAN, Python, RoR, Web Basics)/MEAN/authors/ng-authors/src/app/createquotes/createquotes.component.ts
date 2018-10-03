import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-createquotes',
  templateUrl: './createquotes.component.html',
  styleUrls: ['./createquotes.component.css']
})
export class CreatequotesComponent implements OnInit {
	entry = {};
	current_author = {};
  errors = {};

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  	this.entry = {content: ""};
  	this.current_author = {id: "", name: ""};
    this.errors = {content: false};
  	this.getName();
  }

  goHome() {
    this._router.navigate(['/']);
  }

  getName()
  {
  	this._route.params.subscribe((params: Params) => {
  		let observable = this._httpService.getAuthorsName(params['id']);
  		observable.subscribe((data2:any) => {
  		data2 = data2.json();
  		this.current_author = {id: data2.author._id, name: data2.author.name}
  		});
  	});
  }

  createQuoteButton(event, id) {
  	let observable = this._httpService.createQuote(this.entry, id);
  	observable.subscribe(data2 => {
  		this.entry = {content: ""};
      this.goHome();
  	},
    (err) => {
      let errors = err.json();
      this.errors = errors;
      this.entry = {content: ""};
    });
  	
  }

}
