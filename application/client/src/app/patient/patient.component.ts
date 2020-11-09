import { Component, OnInit, ChangeDetectorRef, ViewChild,ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { ApiService } from '../services/index';


@Component({
  selector: 'app-producer',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  
  currentUser: any;
  EMR: Object;
  clickEdit: boolean = false;

  //html
  @ViewChild('alert', { static: true }) alert: ElementRef;
  alertMessageList = [];
  isShowAlert: boolean = false;

  constructor(private userService: UserService
    ,private apiService: ApiService
    ,private cd: ChangeDetectorRef) { }

    ngOnInit() {
      this.currentUser = this.userService.getCurrentUser();
      this.apiService.queryEMRByPatientId().subscribe(api => {
        this.EMR = api;
        console.log(this.EMR);
        //check if there are predict as have disease
        if(this.EMR["predict"]){
          let message;
          for(let predict in this.EMR["predict"]){
            if(this.EMR["predict"][predict].predictResult){ //check if ther are predict result
              
                if(this.EMR["labResult"]  //check if they already have lab result or not
                && (Object.keys(this.EMR["labResult"]).find(key => key === predict)== undefined)){ 
                  message = "You are curently has High Risk of having  " + predict + ". ";
                  this.alertMessageList.push(message);
                }
              
            }
          }
         
        }
        if(this.alertMessageList.length >0){
          this.isShowAlert = true;
        }
       
      }, error => {
        console.log(JSON.stringify(error));
        console.log("Query queryEMRByPatientId failed: " + error['error']['message']);
      });
    }
   
    isnotObj(data){
      return typeof data !== 'object';
    }

    updateSymp(){
      this.clickEdit = true;
    }
    back(){
      this.clickEdit = false;
    }

    //handle alert
    closeAlert() {
      this.alert.nativeElement.classList.remove('show');
      this.isShowAlert = false;
    }
    
    // End handle alert
}


