import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/dto/request/LoginDto';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loginDto: LoginDto;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  handleLogin(): void {
    if (this.formLogin.valid) {
      const loginData = this.formLogin.value;

      this.authService.login(loginData).subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/dashboard']); // Redirect to dashboard on successful login
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }
}
