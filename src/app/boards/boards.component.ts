import { Component, OnInit } from '@angular/core';
import { Board } from './board';
import { BoardsService } from './boards.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})

export class BoardsComponent implements OnInit {

  boards: Board[] = [];

  constructor( private boardsService: BoardsService ) { }

  ngOnInit() {
    this.getAllBoards();
  }

  getAllBoards(): void {
    this.boardsService.getAllBoards()
      .subscribe(board => {
        if(board.length != 0){
          this.boards = board;
        }
      });
  }

  addBoard(title:string) {
    if(title){
      this.boardsService.addBoard(title)
        .subscribe(
          (board:Board) => {
          this.boards.push({board_id: board.board_id, title: title});
        });
    }
  }

}
