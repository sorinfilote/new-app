import { Injectable } from '@angular/core';
import { User } from '../auth/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Board } from './board';

@Injectable({
  providedIn: 'root'
})

export class BoardsService {

  apiUrl = 'http://localhost:1234/boards';
  currentUser : User;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.authService.currentUserFromLocalStorage().subscribe(
      authUser => {this.currentUser = authUser;}
      );
  }

  getAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.apiUrl + '/' + this.currentUser.session);
  }

  addBoard( title ){
    let data = {auth: {session:this.currentUser.session},
      data:{title: title}};
    return this.http.post(this.apiUrl, data);
  }

  getBoardTitle(board_id){
    return this.http.get(this.apiUrl + '/' + this.currentUser.session + '/' + board_id);
  }

  updateBoard(data){
    let boardData = {"auth": {"session": this.currentUser.session},
      "data":data};
    return this.http.put(this.apiUrl, boardData);
  }

  deleteBoard(board_id){
    let boardData = {"auth": {"session": this.currentUser.session},
      "data":{"board_id": board_id}};
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: boardData,
    };
    return this.http.delete(this.apiUrl, options);
  }
}
