import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-createauth',
  templateUrl: './createauth.component.html',
  styleUrls: ['./createauth.component.css']
})
export class CreateauthComponent implements OnInit {
	entry = {};
  errors = {};

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  	this.entry = {name: ""};
    this.errors = {name: false};
  }

  goHome() {
    this._router.navigate(['/']);
  }

  createButton() {
  	let observable = this._httpService.createAuthor(this.entry);
  	observable.subscribe(data2 => {
  		this.entry = {name: ""};
      this.goHome();
  	},
    (err) => {
      let errors = err.json();
      this.errors = errors.errors;
      this.entry = {name: ""};
    });
  }

}
