import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-editauth',
  templateUrl: './editauth.component.html',
  styleUrls: ['./editauth.component.css']
})
export class EditauthComponent implements OnInit {
	this_author: any;
  errors = {};

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.errors = {name: false};
  	this.this_author = {id: "", name: ""};
  	this._route.params.subscribe((params: Params) => {
  		let observable = this._httpService.getOneAuthor(params['id']);
  		observable.subscribe((data2:any) => {
  		data2 = data2.json();
  		this.this_author = {id: params['id'], name: data2.author.name};
  		});
  	});
  }

  goHome() {
    this._router.navigate(['/']);
  }

  editButton(event)
  {
  	let observable = this._httpService.updateAuthor(this.this_author);
  	observable.subscribe(data2 => {
  		this.this_author = {name: ""};
      this.goHome();
  	},
    (err) => {
      let errors = err.json();
      this.errors = {name: errors};
      this.this_author = {id: "", name: ""};
      this._route.params.subscribe((params: Params) => {
        let observable = this._httpService.getOneAuthor(params['id']);
        observable.subscribe((data2:any) => {
        data2 = data2.json();
        this.this_author = {id: params['id'], name: data2.author.name};
      });
    });
    });
  	
  }

}
