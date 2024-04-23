import { Component, OnInit } from '@angular/core';
import { RegisterDto } from 'src/app/dto/request/RegisterDto';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  constructor(private authService:AuthService ) { }
  registerDto:RegisterDto;

  registerUser(): void {
    if (this.registerDto.agreeToPolicy) {
      this.authService.register(this.registerDto).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Navigate to another route or display success message
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Display error message
        }
      });
    } else {
      alert('You must agree to the privacy policy to register.');
    }
  }

  ngOnInit() {
  }

}
