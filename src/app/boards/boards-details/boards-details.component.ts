import { Component, OnInit } from '@angular/core';
import { Board } from '../board';
import { BoardsService } from '../boards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from '../../lists/lists.service';
import { List } from '../../lists/list';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDeleteDialogComponent } from '../../shared/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-boards-details',
  templateUrl: './boards-details.component.html',
  styleUrls: ['./boards-details.component.css']
})

export class BoardsDetailsComponent implements OnInit {

  board: Board;
  boardsLists: List[];
  allDropLists: any;
  confirmationDialogRef: MatDialogRef<ConfirmDeleteDialogComponent>;

  constructor(
    private boardsService: BoardsService,
    private listsService: ListsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.board = {board_id:this.route.snapshot.params.id, title:''};
  }

  ngOnInit() {
    this.getBoardTitle();
    this.getBoardLists();
  }

  getBoardTitle(){
    this.boardsService.getBoardTitle(this.board.board_id).subscribe(
      (data:Board) => {
        this.board.title = data.title
      },
      error => console.log(error)
      );
  }

  updateTitle(title){
    if(title !== this.board.title){
      this.board.title = title;
      let data = this.board;
      this.boardsService.updateBoard(data).subscribe(
        () => console.log('title updated')
      );
    }
  }

  deleteBoard(){
    this.confirmationDialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {});
    this.confirmationDialogRef.afterClosed().subscribe(
      (confirm) => {
        if (confirm) {
          this.boardsService.deleteBoard(this.board.board_id).subscribe(
            () => this.router.navigate(['boards'])
          );
        }
      }
    );
  }

  getBoardLists(){
    this.listsService.getBoardLists(this.board.board_id).subscribe(
      data => {
        this.boardsLists = data;
        this.allDropLists = data.map(item => 'list_id_'+item.list_id);
      },
      error => console.log(error)
      );
  }

  addList(title) {
    if(title != ""){
      let data = {"board_id": this.board.board_id, "title": title};
      this.listsService.addList(data).subscribe(
        (list:List)=> {
          this.boardsLists.push({list_id: list.list_id, title:title})
          this.allDropLists.push('list_id_'+list.list_id);
        }
      );
    }
  }

  updateList(deleteList){
    this.boardsLists = this.boardsLists.filter(item => item.list_id != deleteList.list_id);
  }

}
