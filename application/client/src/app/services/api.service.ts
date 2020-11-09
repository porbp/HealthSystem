import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  id: String = "";
  pwd: String = "";
  body: Object;
  options: Object;
  private OrdersData = new BehaviorSubject([]);
  orders$: Observable<any[]> = this.OrdersData.asObservable();

  private RuleData = new BehaviorSubject([]);
  rule$: Observable<any[]> = this.RuleData.asObservable();


  baseUrl = "http://localhost:3000";

  constructor(private httpClient: HttpClient, private userService: UserService) {}


  createUserAuthorizationHeader(headers: HttpHeaders) {
    const currentUser = this.userService.getCurrentUser();
    return headers.append('Authorization', 'Basic ' + btoa(currentUser.userid+':'+currentUser.password)); 
  }

  getAllUsers(){
    //only admin call CA fabric
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('admin:adminpw')); 
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.get(this.baseUrl + '/api/users/', {headers:headers});
  }

  getUser(){
     //only admin call CA fabric
     // to set cuurent user in local storage item during using application
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('admin:adminpw')); 
    headers = headers.append('Authorization', 'Basic ' + btoa(this.id+':'+this.pwd)); 
    return this.httpClient.get(this.baseUrl + '/api/users/'+ this.id, {headers:headers});
  }

  isUserEnrolled(){
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.get(this.baseUrl + '/api/is-user-enrolled/' + this.id, {headers:headers});
  }


  queryEMRByPatientId() {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    console.log("queryEMRByPatientId --- api service"+this.id);
    return this.httpClient.get(this.baseUrl + '/api/getEMRByPatientId/' + this.id, {headers:headers})
  }

  getRuleList() {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    console.log("getRuleList --- api service"+this.id);
    this.httpClient.get<any[]>(this.baseUrl + '/api/getRuleList/', {headers:headers}).subscribe (rule => {
      console.log ("getRuleList --> ",rule);
      this.RuleData.next(rule);
      return this.RuleData;
    }, error => {
      console.log(JSON.stringify(error));
      console.log("Problem getting RuleData: " + error['error']['message']);
    })
   // return this.httpClient.get(this.baseUrl + '/api/getRuleList/', {headers:headers})
  }

  queryAllEMR() {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    this.httpClient.get<any[]>(this.baseUrl + '/api/queryAllEMR/', {headers:headers}).subscribe (emrs => {
      console.log (emrs);
      this.OrdersData.next(emrs);
      if(emrs.length == 0){
        this.OrdersData.next(["none"]);
      }
      return this.OrdersData;
    }, error => {
      console.log(JSON.stringify(error));
      console.log("Problem getting emrs: " + error['error']['message']);
    })
  }


  clearOrders(){
    this.OrdersData.next([]);
    this.RuleData.next([]);
  }

  updateEMR() {
    console.log("== updateEMR API =="+this.body);
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.post(this.baseUrl + '/api/updateEMR/', this.body, {headers:headers})
  }

  async updateEMR2() {
    console.log("== updateEMR2 API =="+this.body);
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return await this.httpClient.post(this.baseUrl + '/api/updateEMR/', this.body, {headers:headers}).toPromise();
}

  createEMR() {
    console.log("== createEMR API =="+this.body);
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.post(this.baseUrl + '/api/EMRs', this.body, {headers:headers})
  }

  createEMRFromList() {
    console.log("== createEMRFromList API =="+this.body);
   
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    console.log("== createEMRFromList API =="+JSON.stringify(this.body));
    return this.httpClient.post(this.baseUrl + '/api/createEMRFromList', this.body, {headers:headers})
  }

  getEMRHistory() {
    console.log("== getEMRHistory API =="+this.id);
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.get(this.baseUrl + '/api/getEMRHistory/' + this.id, {headers:headers})
  }

  deleteEMR(){
    console.log("== deleteEMR API =="+this.id);
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.delete(this.baseUrl + '/api/deleteEMR/' + this.id, {headers:headers})
  }

  deleteALLEMR(){
    console.log("== deleteALLEMR API ==");
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.get(this.baseUrl + '/api/deleteAllEMR/', {headers:headers})
  }

  deleteRuleList(){
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.delete(this.baseUrl + '/api/deleteRuleList/', {headers:headers})
  }

}
