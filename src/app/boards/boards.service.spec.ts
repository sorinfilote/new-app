import { BoardsService } from './boards.service';
import { AuthService } from '../auth/auth.service';
import { of} from 'rxjs';
import { HttpClient } from '@angular/common/http';


describe('BoardsService', () => {
  let boardsService: BoardsService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  const stubValueUser = { session: '0e7f1abb03305400e106a050418a8f57217f96947f67f9359e64d647ae856d26a', username: 'a' };

  const stubValueBoards = [
    {board_id: 1, title: "test1", creation_date: "2019-02-11T14:24:39.988Z", last_updated: "2019-02-11T14:24:39.988Z"},
    {board_id: 2, title: "test2", creation_date: "2019-02-11T14:24:39.988Z", last_updated: "2019-02-11T14:24:39.988Z"},
    {board_id: 3, title: "test3", creation_date: "2019-02-11T14:24:39.988Z", last_updated: "2019-02-11T14:24:39.988Z"}
  ];

  let authServiceSpy;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    authServiceSpy =
      jasmine.createSpyObj('AuthService', ['currentUserFromLocalStorage']);
    authServiceSpy.currentUserFromLocalStorage.and.returnValue(of(stubValueUser));

    boardsService = new BoardsService(<any> httpClientSpy, authServiceSpy);
  });

  it('currentUser should return mockCurrentUser', () => {
    authServiceSpy.currentUserFromLocalStorage().subscribe(
      (data)=> {expect(data).toEqual(stubValueUser, 'service returned stub value');}
    );
  });

  it('should have a method that return all boards', () => {
    httpClientSpy.get.and.returnValue(of(stubValueBoards));
    boardsService.getAllBoards().subscribe(
      boards => { expect(boards).toEqual(stubValueBoards)}
    );
  });

  it('should have a method to add a new board that return id of new board', () => {
    httpClientSpy.post.and.returnValue(of(1));
    boardsService.addBoard('new title').subscribe(
      data => { expect(data).toEqual(1)}
    );
  });

  it( 'should have a method to get board title with board id', () => {

  })

});



//
// });
