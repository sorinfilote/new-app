import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
    this.authService.logout();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        () => {
          this.router.navigate(['boards']);
        },
        error => {
          console.log(error);
          this.error = (error.status == 404)?"Username or password are wrong":"";
        });
  }
}
