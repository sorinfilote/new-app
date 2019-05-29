import { Injectable } from '@angular/core';
import { User } from '../auth/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from './card';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class CardsService {
  apiUrl = 'http://localhost:1234/cards';
  currentUser: User;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.authService.currentUserFromLocalStorage().subscribe(
      authUser => {this.currentUser = authUser;}
    );
  }

  getArrayWithCards(list_id){
      return this.http.get<Card[]>(this.apiUrl + '/' + this.currentUser.session + '/' + list_id);
  }

  getCardTitleDescription(data){
    return this.http.get(this.apiUrl + '/' + this.currentUser.session + '/' + data.list_id + '/' + data.card_id);
  }

  addCard(data){
    let listData = {"auth": {"session": this.currentUser.session},
      "data":data};
    return this.http.post(this.apiUrl, listData);
  }

  updateCard(data){
    let cardData = {"auth": {"session": this.currentUser.session},
      "data":data};
    return this.http.put(this.apiUrl, cardData);
  }

  updateCardPosition(cardId, newListId, newCardIdPos){
    let cardData = {"auth": {"session": this.currentUser.session},
      "data":{card_id: cardId, new_list_id: newListId, pos: newCardIdPos}};
    return this.http.put(this.apiUrl, cardData);
  }

  deleteCard(card_id){
    let cardData = {"auth": {"session": this.currentUser.session},
      "data":{card_id: card_id}};
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: cardData,
    };
    return this.http.delete(this.apiUrl, options);
  }
}
