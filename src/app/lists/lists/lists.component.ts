import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { List } from '../list';
import { ListsService } from '../lists.service';
import { Card } from '../../cards/card';
import { CardsService } from '../../cards/cards.service';
import { ConfirmDeleteDialogComponent } from '../../shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  @Input()
  list: List;
  @Input()
  allDropLists;
  @Output()
  listUpdate = new EventEmitter();
  arrayWithCards: Card[];
  arrCardsPosition: any[];
  confirmationDialogRef: MatDialogRef<ConfirmDeleteDialogComponent>;
  list_id: string;


  constructor(
    private listsService: ListsService,
    private cardsService: CardsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getArrayWithCards();
    this.list_id = 'list_id_'+this.list.list_id;
    this.listsService.listIdAndIndexToRemove.subscribe(
      data => {
        if(this.list.list_id === parseInt(data.listId)){
          this.arrCardsPosition.splice(data.indexNumber, 1);
        }
      }
    )
  }

  updateTitle(title){
    if(title != this.list.title){
      this.list.title = title;
      let data = this.list;
      this.listsService.updateList(data).subscribe(
        () => console.log('title updated')
      );
    }
  }

  deleteList(list_id){
    this.confirmationDialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {});
    this.confirmationDialogRef.afterClosed().subscribe(
      (confirm) => {
        if (confirm) {
          this.listsService.deleteList(list_id).subscribe(
            () => this.listUpdate.emit(this.list)
          );
        }
      }
    );
  }

  addCard(title) {
    if(title){
      let data = {"list_id": this.list.list_id, "title": title};
      this.cardsService.addCard(data).subscribe(
        (card:Card)=> this.arrayWithCards.push({card_id: card.card_id, list_id: this.list.list_id, title:title, description:"", pos: 0})
      );
    }
  }

  getArrayWithCards(){
    // console.log('show loader');
    this.cardsService.getArrayWithCards(this.list.list_id).subscribe(
      data => {
        this.arrayWithCards = data
        this.arrCardsPosition = data.map(item => item.pos);
        console.log(this.arrCardsPosition);
        // console.log('hide loader');
        return data;
      },
      error => console.log(error)
    );
  }

  updateCardPosition(cardId, prevIndex, currentIndex, prevContainer, currentContainer) {
    let prevListId = prevContainer.replace("list_id_", "");
    let currentListId = currentContainer.replace("list_id_", "");
    let newListId;
    let newCardIdPos;
    let currentIndexIncremented = currentIndex + 1;
    let currentIndexDecremented = currentIndex - 1;
    let genericNumber = 16384;

    if(prevListId !== currentListId) {
      newListId = currentListId;
      if(this.arrCardsPosition.length === 0){
        newCardIdPos = genericNumber;
      }else if(currentIndex === this.arrCardsPosition.length) {
        newCardIdPos = this.arrCardsPosition[currentIndexDecremented] + genericNumber;
      }else if(currentIndex === 0){
        newCardIdPos = Math.trunc(this.arrCardsPosition[currentIndex] / 2);
      }else{
        newCardIdPos = this.calcAverage(currentIndexDecremented, currentIndex);
      }
    }else{
      if(prevIndex < currentIndex){
        newCardIdPos = (currentIndexIncremented === this.arrCardsPosition.length) ? this.arrCardsPosition[currentIndex] + genericNumber : this.calcAverage(currentIndex, currentIndexIncremented);
      }else{
        newCardIdPos = (currentIndex === 0) ? this.arrCardsPosition[currentIndex] / 2 : this.calcAverage(currentIndex, currentIndexDecremented);
      }
    }

    this.cardsService.updateCardPosition(cardId, newListId, newCardIdPos).subscribe(
      () => {
        this.getArrayWithCards(),
        this.listsService.removeItemFromLastList(prevListId, prevIndex);
      }
    );
  }

  calcAverage(a,b){
    return Math.trunc((this.arrCardsPosition[a] + this.arrCardsPosition[b]) / 2);
  }

  updateCards(deleteCard){
    this.arrayWithCards = this.arrayWithCards.filter(item => item.card_id != deleteCard);
  }

  drop(event: CdkDragDrop<object[]>) {
    let currentCardId = event.item.element.nativeElement.dataset.cardId;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.updateCardPosition(currentCardId, event.previousIndex, event.currentIndex, event.previousContainer.id, event.container.id);
  }

}
