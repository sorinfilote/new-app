import {AuthService} from './auth.service';
import {User} from './user';
import {of} from 'rxjs';
import {after} from 'selenium-webdriver/testing';


describe('AuthService', () => {

  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let authService: AuthService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    authService = new AuthService(<any> httpClientSpy);

  });
  afterAll(() => {
    authService.currentUserSubject.next(null);
  });

  const currentUser: User[] =
    [{ session: '0e7f1abb03305400e106a050418a8f57217f96947f67f9359e64d647ae856d26', username: 'a' }];

  const mockUserLocalStorage = { session: '0e7f1abb03305400e106a050418a8f57217f96947f67f9359e64d647ae856d26a', username: 'a' };


  it('should return user after login', () => {

    httpClientSpy.post.and.returnValue(of(currentUser));
    authService.login('a', 'a').subscribe(
      user => expect(user).toEqual(currentUser, 'expected user'),
      fail
    );
  });

  it('should return user after register', () => {

    httpClientSpy.post.and.returnValue(of(currentUser));

    authService.register('a', 'a').subscribe(
      user => expect(user).toEqual(currentUser, 'expected user'),
      fail
    );
  });

  it('currentUserValue should return undefined on init ', () => {
    let currentUserSubject = authService.currentUserValue();
    expect(currentUserSubject).toBe(null);
  });

  it('currentUserValue should return currentUser from localstorage after next ', () => {

    authService.currentUserSubject.next(mockUserLocalStorage);

    let mockCurrentUserSubject = authService.currentUserValue();
    expect(mockCurrentUserSubject).toEqual(mockUserLocalStorage);

  });



  it('should have a prop with current user observable', () => {
    authService.currentUserSubject.next(mockUserLocalStorage);

    authService.currentUserFromLocalStorage().subscribe(
      (data)=> {expect(data).toEqual(mockUserLocalStorage);}
    );
  });

  it('currentUserValue should return null after logout',() => {

    authService.currentUserSubject.next(mockUserLocalStorage);
    authService.logout();
    let currentUserValue = authService.currentUserValue();
    expect(currentUserValue).toBe(null);

  });

});





