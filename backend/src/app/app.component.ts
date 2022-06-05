import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { BasicService } from './Services/basic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  loggedIn: string;

  constructor(private baiscService: BasicService,
    private auth: AuthService) {
      this.loggedIn = localStorage.getItem('token');
  }

  logout(){
    this.auth.logout();
  }
}



// local
export const baseUrl = 'http://localhost:8000/api'; 
