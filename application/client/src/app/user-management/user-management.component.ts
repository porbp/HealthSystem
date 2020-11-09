import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, AuthService } from '../services/index';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})

export class UserManagementComponent implements OnInit{
  
  //add user
  newUser: Object;
  types: any[];
  newUserForm: FormGroup;
  submitted = false;
  success = false;

  //load user list
  isDisplay = false;
  allUsers: any;
  authService: any;
  router: any;


  constructor(private api: ApiService, private auth: AuthService,
     private formBuilder: FormBuilder, private cd: ChangeDetectorRef){}

  ngOnInit(){
    
    //user list
    this.types = ["doctor", "patient", "lab"];
    this.loadUserList(0);

    // add new user
    this.newUserForm = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      usertype: ['', Validators.required]
    });

  }

//===== add user ======

  onSubmit(){
    this.submitted = true;

    if (this.newUserForm.invalid) {
      return;
    }

    if (this.newUserForm.controls.password.value != this.newUserForm.controls.confirm_password.value){
      console.log("the passwords don't match");
      this.success = false;
      return;
    }

    var user = {
      userid: this.newUserForm.controls.id.value,
      password: this.newUserForm.controls.password.value,
      usertype: this.newUserForm.controls.usertype.value,
    }

    console.log("onSubmit new user --- "+user);
    this.auth.register(user).subscribe(res => {
      console.log(JSON.stringify(res));
      this.success = true;
      this.enroll(user);
    }, error => {
      console.log(JSON.stringify(error));
      this.success = false;
    })
  }
  
  enroll(user) {
    this.auth.enroll(user).subscribe(data => {
      //alert("Enrollment was successful. User can log in to be taken to their portal.");
      //this.router.navigate(['/login']);
      this.loadUserList(0);
    }, error => {
      console.log(JSON.stringify(error));
      alert("Enrollment failed: " + error['error']['message']);
    });
  }

  //===== End add user ======



  //===== load user list======
  loadUserList(tab) {
    if (tab == 0) {
      this.api.getAllUsers().subscribe(res => {
        var userArray = Object.keys(res).map(function (userIndex) {
          let user = res[userIndex];
          
          console.log(JSON.stringify(user));
          return user;
        });
        for (let user of userArray) {
          this.api.id = user.id;
          this.api.isUserEnrolled().subscribe(res => {
            // NOTE: adding a new user attribute called enrolled
            user.enrolled = res;
          }, error => {
            console.log(JSON.stringify(error));
          });
        }
        console.log(userArray);
        this.allUsers = userArray;
        this.isDisplay = true;
        console.log("finish list user",);
      }, error => {
        console.log(JSON.stringify(error));
        alert("Problem loading user list: " + error['error']['message']);
      });
    }
  }
  //===== End load user list======



  


}