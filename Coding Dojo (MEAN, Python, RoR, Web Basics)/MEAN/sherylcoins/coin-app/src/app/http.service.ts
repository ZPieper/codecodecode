import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpService {
  movements = [];
  value: number;
  coins_owned: number;
  transaction: any;
  id: any;

  constructor(private _http: Http) { 
    this.movements = [];
    this.value = 1;
    this.coins_owned = 0;
    this.transaction = {action: "", amount: 0, value: 0, id: 0};
  }

  getID(){
    if (this.id == undefined)
    {
      this.id = 1;
    }
    else
    {
      this.id++;
    }
    return this.id;
  }

  buttonBuy(num){
    this.value = this.value - Number(num);
    this.coins_owned += Number(num);
    this.transaction = { action: "Bought", amount: num, value: this.value, id: this.getID() };
    this.movements.push(this.transaction);
  }

  buttonSell(num){
    this.value = this.value + Number(num);
    this.coins_owned -= Number(num);
    this.transaction = { action: "Sold", amount: num, value: this.value, id: this.getID() };
    this.movements.push(this.transaction);
  }

  buttonMine(answer){
    this.value++;
    this.coins_owned++;
    this.transaction = { action: "Mined", amount: 1, value: this.value, id: this.getID() };
    this.movements.push(this.transaction);
  }

   getOneTransaction(this_transaction_id){
   	for (let i = 0; i < this.movements.length; i++)
    {
      if (Number(this.movements[i].id) == Number(this_transaction_id))
      {
        return this.movements[i];
      }
    }
   }

}

// import { ActivatedRoute, Params, Router } from '@angular/router';
// private _route: ActivatedRoute,
//     private _router: Router

//     ****************************************************************************************************************

//   ngOnInit(){
//     this.newTask = {title: "", description: ""};
//     this.hidden = true;
//     this.upTask = {title: "", description: ""};
//   }

//   buttonShow(event: any){
//     let observable = this._httpService.getTasks();
//     observable.subscribe((data2) => {
//       data2 = data2.json();
//       this.tasks = data2.data;
//       });
//     }

//   buttonDelete(event: any, this_task_id: any){
//     let observable = this._httpService.deleteTask(this_task_id);
//     observable.subscribe((data2) => {
//       });
//     }

//   buttonCreate(event: any){
//     event.preventDefault();
//   let observable = this._httpService.createTask(this.newTask);
//     observable.subscribe((data2) => {
//       this.newTask = {title: "", description: ""};
//       });
//     }

//   buttonEdit(event: any, this_task_id: any){
//   let observable = this._httpService.getOneTask(this_task_id);
//     observable.subscribe((data2) => {
//       data2 = data2.json();
//       this.upTask = {id: this_task_id, title: data2.title, description: data2.description};
//       this.hidden = false;
//       });
//   }

//   buttonUpdate(event: any){
//   event.preventDefault();
//   let observable = this._httpService.updateTask(this.upTask);
//     observable.subscribe((data2) => {

//       this.hidden = true;
//       });
//     this.upTask = {id: "", title: "", description: ""};
//   }