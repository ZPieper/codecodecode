import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	authors = [];

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  	this.display();
  }

  display()
  {
  	let observable = this._httpService.getAuthors();
  	observable.subscribe(data2 => {
  		data2 = data2.json();
  		this.authors = data2['data'];
  	});
  }

  deleteButton(id)
  {
  	let observable = this._httpService.deleteAuthor(id);
  	observable.subscribe(data2 => {
  		this.display();
  	});	
  }

}
