import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../../material/material.module';

const stubValueUser =  { session: '0e7f1abb03305400e106a050418a8f57217f96947f67f9359e64d647ae856d26a', username: 'a' };

class MockAuthService {
  login() {
    return of(stubValueUser);
  }
  logout(){}
}
let router = {
  navigate: jasmine.createSpy('navigate')
}

describe('LoginComponent',() => {

  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let component: LoginComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, MaterialModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService},
        { provide: Router, useValue: router }
      ],
      declarations:[LoginComponent]
    }).compileComponents();
    // inject both the component and the dependent service.
    fixture = TestBed.createComponent(LoginComponent);
    debugElement = fixture.debugElement;

  }));

  it('should have 2 inputs', () => {
    component = fixture.componentInstance;
    component.ngOnInit();
    let inputElement = debugElement.queryAllNodes(By.css('.form-control'));
    expect(inputElement.length).toBe(2);
  });

  it('should have a submit button', () => {
    component = fixture.componentInstance;
    component.ngOnInit();
    let inputElement = debugElement.query(By.css('.btn-primary')).nativeElement;
    expect(inputElement).toBeTruthy();
  });

  it('should be invalid form if is empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('username should be invalid if empty', () => {
    let username = component.loginForm.controls['username'];
    expect(username.valid).toBeFalsy();
  });

  it('should be valid if username and password is not empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue("a");
    component.loginForm.controls['password'].setValue("ap");
    expect(component.loginForm.valid).toBeTruthy();
  });

  // it('should submit and return mock', () => {
  //   component.ngOnInit();
  //   component.loginForm.controls['username'].setValue("a");
  //   component.loginForm.controls['password'].setValue("ap");
  //   debugElement.query(By.css('form')).triggerEventHandler('submit', null);
  //   fixture.detectChanges();
  //
  //
  // });


});
