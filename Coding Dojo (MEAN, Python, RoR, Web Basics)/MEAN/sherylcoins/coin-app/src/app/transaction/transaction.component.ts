import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
	transaction: any;
	id: number;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  	this._route.params.subscribe((params: Params) => {
  		this.id = Number(params['id']);
  		this.transaction = this._httpService.getOneTransaction(this.id);
  	});
  }

}
