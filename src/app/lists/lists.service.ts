import { Injectable } from '@angular/core';
import { User } from '../auth/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { List } from './list';
import { AuthService } from '../auth/auth.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ListsService {

  apiUrl = 'http://localhost:1234/lists';
  currentUser: User;
  listIdAndIndexToRemove = new Subject<any>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.authService.currentUserFromLocalStorage().subscribe(
      authUser => {this.currentUser = authUser;}
    );
  }

  getBoardLists(board_id){
    return this.http.get<List[]>( this.apiUrl + '/' + this.currentUser.session + '/' + board_id);
  }

  updateList(data){
    let listData = {"auth": {"session": this.currentUser.session},
      "data":data};
    return this.http.put(this.apiUrl, listData);
  }

  addList(data){
    let listData = {"auth": {"session": this.currentUser.session},
      "data":data};
    return this.http.post(this.apiUrl, listData);
  }

  deleteList(data){
    let listData = {"auth": {"session": this.currentUser.session},
      "data":{list_id: data}};
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: listData,
    };
    return this.http.delete(this.apiUrl, options);
  }

  removeItemFromLastList(listId, indexNumber){
    let data = {'listId':listId, 'indexNumber': indexNumber};
    this.listIdAndIndexToRemove.next(data);
  }

}
