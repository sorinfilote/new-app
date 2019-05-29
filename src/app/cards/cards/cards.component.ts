import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from '../card';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CardsDetailsComponent} from '../cards-details/cards-details.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input()
  card: Card;
  @Output()
  cardDeleted = new EventEmitter;

  singleCardDialogRef: MatDialogRef<CardsDetailsComponent>;

  constructor( private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(){

    this.singleCardDialogRef = this.dialog.open(CardsDetailsComponent, {
      data: this.card,
      minWidth: '50vw'
    });
    this.singleCardDialogRef.afterClosed().subscribe(
      (card_id) => {
        if(card_id){ this.cardDeleted.emit(card_id)};
      }
    );
  }

}
