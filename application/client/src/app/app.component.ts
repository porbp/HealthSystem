import { Component } from '@angular/core';
import { AuthService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthService){}
  title = 'Health-System';
  
  logout(){
    console.log("init Logout");
    this.auth.logout();
  }
}
