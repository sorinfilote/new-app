import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerForm.value.username, this.registerForm.value.password)
      .subscribe(
        () => {
          this.router.navigate(['boards']);
        },
        error => {
          console.log(error);
          this.error = (error.status == 404)?"username not in db":"";
        });
  }
}
