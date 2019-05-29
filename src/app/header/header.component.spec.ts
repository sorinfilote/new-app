import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {MaterialModule} from '../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const stubValueUser =  { session: '0e7f1abb03305400e106a050418a8f57217f96947f67f9359e64d647ae856d26a', username: 'a' };

class MockAuthService {
  currentUserFromLocalStorage() {
    return of(stubValueUser);
  }
  logout(){}
}
let router = {
  navigate: jasmine.createSpy('navigate')
}

describe('HeaderComponent Class',() => {

  let comp: HeaderComponent;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [
        HeaderComponent,
        { provide: AuthService, useClass: MockAuthService},
        { provide: Router, useValue: router }
      ]
    });
    // inject both the component and the dependent service.
    comp = TestBed.get(HeaderComponent);
    authService = TestBed.get(AuthService);
  });

  it('should have a currentUser after construction', () => {
    expect(comp.currentUser).toBeTruthy();
  });

  it('logout method if called router should navigate to /login', () => {
    comp.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

});


describe('HeaderComponent Dom', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService},
        { provide: Router, useValue: router }
      ],
      declarations: [ HeaderComponent ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should contain an app name', () => {
    fixture.detectChanges();
    let hAppName = fixture.nativeElement.querySelector('h5');
    expect(hAppName.textContent).toContain('Project Mananger App');
  });
  it('should contain a link to boards', () => {
    let navItem: HTMLElement = fixture.nativeElement;
    let elNavItem = navItem.querySelectorAll(".link-boards");
    expect(elNavItem[0].textContent).toContain('Boards');
  });
  it('should contain a link to logout', () => {
    fixture.detectChanges();
    let navItem: HTMLElement = fixture.nativeElement;
    let elNavItem = navItem.querySelectorAll(".link-logout");
    expect(elNavItem[0].textContent).toContain('Logout');
  });

  it('should list the login and register button if currentUser is undefined', () => {
    component.currentUser = null;
    fixture.detectChanges();
    let navItem: HTMLElement = fixture.nativeElement;
    let rNavItem = navItem.querySelectorAll(".link-register");
    expect(rNavItem[0].textContent).toContain('Register');
    let lNavItem = navItem.querySelectorAll(".link-login");
    expect(lNavItem[0].textContent).toContain('Login');
  });
  it('should contain the username after logout button', () => {
    fixture.detectChanges();
    let navItem: HTMLElement = fixture.nativeElement;
    let elNavItem = navItem.querySelectorAll(".link-logout");
    expect(elNavItem[0].textContent).toContain(component.currentUser.username);
  });

});
