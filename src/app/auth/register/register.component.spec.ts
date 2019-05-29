import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {of} from 'rxjs';
import {DebugElement} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {By} from '@angular/platform-browser';

const stubValueUser =  { session: '0e7f1abb03305400e106a050418a8f57217f96947f67f9359e64d647ae856d26a', username: 'a' };

class MockAuthService {
  register() {
    return of(stubValueUser);
  }
  logout(){}
}
let router = {
  navigate: jasmine.createSpy('navigate')
}


describe( 'RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let debugElement: DebugElement;
  let component: RegisterComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, MaterialModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService},
        { provide: Router, useValue: router }
      ],
      declarations:[RegisterComponent]
    }).compileComponents();
    // inject both the component and the dependent service.
    fixture = TestBed.createComponent(RegisterComponent);
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
    expect(component.registerForm.valid).toBeFalsy();
  });


})
