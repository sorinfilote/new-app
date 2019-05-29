import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsComponent } from './boards.component';
import {BoardsService} from './boards.service';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';
import {MaterialModule} from '../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const stubValueBoards = [
  {board_id: 1, title: "test1", creation_date: "2019-02-08T14:47:22.340Z", last_updated: "2019-02-08T14:47:22.340Z"},
  {board_id: 2, title: "test2", creation_date: "2019-02-08T14:47:22.340Z", last_updated: "2019-02-08T14:47:22.340Z"},
  {board_id: 3, title: "test3", creation_date: "2019-02-08T14:47:22.340Z", last_updated: "2019-02-08T14:47:22.340Z"}
];
let router = {
  navigate: jasmine.createSpy('navigate')
}

class MockBoardsService {
  currentUser = {session:'4512521521521', username:'a'};

  getAllBoards(){
    return of(stubValueBoards);
  }

  addBoard(title){
    return of({board_id:4, title:'test'});
  }

}

describe('BoardsComponent', () => {
  let component: BoardsComponent;
  let boardsService: MockBoardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [
        BoardsComponent,
        { provide: BoardsService, useClass: MockBoardsService},
      ]
    });
    // inject both the component and the dependent service.
    component = TestBed.get(BoardsComponent);
    boardsService = TestBed.get(BoardsService);
  });

  it('should get all the boards on init', () => {
    component.ngOnInit();
    expect(component.boards).toBe(stubValueBoards);
  });
  it('should contain a method to add a new board', () => {
    component.ngOnInit();
    component.addBoard('new board');
    expect(component.boards.length).toBe(4);
  });

});

describe('BoardsComponent Dom', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        BoardsComponent,
        { provide: BoardsService, useClass: MockBoardsService},
      ],
      declarations: [BoardsComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });


 it('should show all the boards of user', () => {
   fixture.detectChanges();
   let htmlItem: HTMLElement = fixture.nativeElement;
   let elhtmlItem = htmlItem.querySelectorAll(".board-cards");
   expect(elhtmlItem.length).toBe(4);
 });
 it('add new board ( input and button ) should add a new board', () => {
   let htmlItem: HTMLElement = fixture.nativeElement;
   let elInputItem = htmlItem.querySelector('input');
   elInputItem.value = "test";
   elInputItem.dispatchEvent(new Event('input'));
   expect(elInputItem.value).toBe('test');
   let button = htmlItem.querySelector('button');
   button.click();
   expect(component.boards.length).toBe(5);
   expect(component.boards[4].title).toBe('test');
 });

});




