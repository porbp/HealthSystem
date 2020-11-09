import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class UserService {

  currentUser: User;

  id: String = "";
  body: Object;
  options: Object;

  constructor() {
    let user = localStorage.getItem('currentUser');
    if (user){
      this.currentUser = JSON.parse(user);
    }
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  clearCurrentUser() {
    this.currentUser = null;
  }
}
