import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {
  currentUser: any;
  currentActiveTab: String = "predict";
  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.user.getCurrentUser();
    
  }
  filterState(tab){
    this.currentActiveTab = tab;
    console.log(this.currentActiveTab)
  }

}
