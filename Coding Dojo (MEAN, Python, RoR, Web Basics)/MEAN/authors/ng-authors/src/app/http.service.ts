import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private _http: Http) { 
   }

   getAuthors(){
    return this._http.get('/authors');
   }

   deleteAuthor(this_author_id){
    return this._http.delete('/authors/' + this_author_id);
   }

   createAuthor(new_author){
    return this._http.post('/authors', new_author);
   }

   getOneAuthor(this_author_id){
    return this._http.get('/authors/' + this_author_id);
   }

   updateAuthor(this_author){
    return this._http.put('/authors/' + this_author.id, this_author);
   }

   getAuthorsQuotes(this_author_id){
    return this._http.get('/quotesby/' + this_author_id);
   }

   deleteAuthorQuote(this_quote_id){
    return this._http.delete('/quotes/' + this_quote_id);
   }

   createQuote(new_quote, this_author_id){
    return this._http.post('/newquoteby/' + this_author_id, new_quote);
   }

   getAuthorsName(this_author_id){
    return this._http.get('/name/' + this_author_id);
   }

   updateNum(num, this_quote_id){
    // make sure that data being sent to the server is inside of an object
    return this._http.patch('/quotes/vote/' + this_quote_id, {num: num});
   }
}
