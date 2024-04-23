import { Component, OnInit } from '@angular/core';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  users: UserInfoDto[];
  usersPro: UserInfoDto[];
  constructor(private userService: UserService,private authService:AuthService) { }

  ngOnInit(): void {
    //console.log("JWT Token:", this.authService.connectedUser.accessToken);
    this.getUsers();
    this.getUsersPro();
  }
  
  getUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  upgradeToPro(email: string): void {
    this.userService.upgradeToPro(email).subscribe({
      next: (response) => {
        console.log(response);
        this.getUsers(); // Refresh the user list
        alert('User upgraded to professional successfully!'); // Show a success message
      },
      error: (error) => {
        console.error('Error upgrading user to professional:', error);
        alert('Failed to upgrade user to professional.'); // Show an error message
      }
    });
  }
  

  getUsersPro(): void {
    this.userService.getUsersPro().subscribe(data => {
      this.usersPro = data;
    });
  }
}
