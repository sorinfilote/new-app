import { Component, Inject, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardsService } from '../cards.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDeleteDialogComponent } from '../../shared/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-cards-details',
  templateUrl: './cards-details.component.html',
  styleUrls: ['./cards-details.component.css']
})

export class CardsDetailsComponent implements OnInit {

  card: Card;
  editingDescription: boolean = false;
  confirmationDialogRef: MatDialogRef<ConfirmDeleteDialogComponent>;

  constructor(
    private cardsService: CardsService,
    private dialogRef: MatDialogRef<CardsDetailsComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.card = this.data;
  }

  ngOnInit() {
    this.getCard();
  }

  getCard(){
    this.cardsService.getCardTitleDescription(this.card).subscribe(
      (data:Card) => {
          this.card.title = data.title;
          this.card.description = data.description == '' ? 'Here add description' : data.description;
      },
      error => console.log(error)
      );
  }

  close(): void {
    this.dialogRef.close();
  }

  updateTitle(title){
    if(title !== this.card.title){
      this.card.title = title;
      let data = this.card;
      this.cardsService.updateCard(data).subscribe(
        () => console.log('title updated')
      );
    }
  }

  editDescription(){
    this.editingDescription = true;
  }

  updateDescription(){
    if(this.card.description !== ''){
      let data = this.card;
      this.cardsService.updateCard(data).subscribe(
        () => this.editingDescription = false,
        error => console.log(error)
      );
    }else{
      this.editingDescription = true;
    }
  }

  deleteCard(card_id) {
    this.confirmationDialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      minWidth: '80vw'
    });
    this.confirmationDialogRef.afterClosed().subscribe(
      (confirm) => {
        if(confirm){
          this.cardsService.deleteCard(card_id).subscribe(
            () => this.dialogRef.close(card_id),
            error => console.log(error)
          )
        }
      }
    );
  }

}
