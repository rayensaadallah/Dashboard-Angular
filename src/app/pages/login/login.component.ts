import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/dto/request/LoginDto';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin! :FormGroup;
  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit() {
  this.formLogin=this.fb.group({
    usernameOrEmail :this.fb.control(""),
    password : this.fb.control("")
  })
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  handleLogin() {
    console.log(this.formLogin.value);
    const loginDto: LoginDto = {
      usernameOrEmail: this.formLogin.value.usernameOrEmail,
      password: this.formLogin.value.password
    };

    this.authService.login(loginDto).subscribe(
      data => {
        console.log('Login successful', data);
        this.authService.loadprofile(data)
        this.router.navigateByUrl("/dashboard")
        // Handle successful login, e.g., navigate to another route or set user data
      },
      error => {
        console.error('Login error', error);
      }
    );
  }
  ngOnDestroy() {
  }
}
