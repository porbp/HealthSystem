import { variable } from '@angular/compiler/src/output/output_ast';
import { SimpleChanges } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/index';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-emr-update',
  templateUrl: './emr-update.component.html',
  styleUrls: ['./emr-update.component.scss']
})
export class EmrUpdateComponent implements OnInit {

  @Input() selectedEMR: any;
  userType: any;
  

  
  checkBox: any = [];
  days_since_symptom_onset: string;
  cough_severity: string;
  sob_severity: string;
  
  public labResultList: any[] = [{
    casename: '',
    result: 'positive'
  }];


  constructor(private api:ApiService, private user: UserService, private _formBuilder: FormBuilder) { 

  }

  ngOnInit(): void {
    console.log(this.selectedEMR);
    console.log(this.selectedEMR.details);

    this.userType = this.user.getCurrentUser().usertype;
    switch (this.userType.toLowerCase()) {
      case "doctor": {
        let Clinician_Assessed_Symptoms = this.selectedEMR.details.Clinician_Assessed_Symptoms;
        for(let obj in Clinician_Assessed_Symptoms){
          let tmp;
            let fact = (Clinician_Assessed_Symptoms[obj].toLowerCase()=="true");
            console.log(fact,obj,"-->",Clinician_Assessed_Symptoms[obj].toLowerCase());
            tmp = {name:obj, value: Clinician_Assessed_Symptoms[obj],checked: fact};
            this.checkBox.push(tmp);
        }
          break;
      }
      case "patient": { //only symtomps checkbox
        let sym = this.selectedEMR.details.symptoms;
        for(let obj in sym){
          let tmp;
          if(obj == "days_since_symptom_onset"){
            this.days_since_symptom_onset = sym[obj] || "0";
          }else if(obj == "cough_severity"){
            this.cough_severity = sym[obj];
          }else if(obj == "sob_severity"){
            this.sob_severity = sym[obj];
          }else{
            let fact = (sym[obj].toLowerCase()=="true");
            console.log(fact,obj,"-->",sym[obj].toLowerCase());
            tmp = {name:obj, value: sym[obj],checked: fact};
            this.checkBox.push(tmp);
          }
        }
          break;
      }
      default:{}
      }
  }

  selectedOptions() {
  console.log("selectedOptions ===",this.checkBox);
  console.log("selectedOptions ==",this.days_since_symptom_onset,this.cough_severity,this.sob_severity);
  let selectedOption = {};
  
  for(let i=0; i<this.checkBox.length;i++){
    console.log("before ==>",this.checkBox[i]);
    selectedOption[this.checkBox[i].name] = this.checkBox[i].checked.toString();
    console.log("after ==>",selectedOption);
  }
  if(this.userType == "patient"){
    selectedOption["cough_severity"] = "";
    if(selectedOption["cough"] == "true"){
      selectedOption["cough_severity"] = this.cough_severity;
    }
  
    selectedOption["days_since_symptom_onset"] = "";
    if(this.days_since_symptom_onset != undefined && this.days_since_symptom_onset!= null){
      selectedOption["days_since_symptom_onset"] = this.days_since_symptom_onset;
    }
  
    selectedOption["sob_severity"] = "";
    if(selectedOption["sob"] == "true"){
      selectedOption["sob_severity"] = this.days_since_symptom_onset;
    }
    let emr = this.selectedEMR;
    emr.details.symptoms = selectedOption;
    this.normalUpdate(emr);
  }else{
    let emr = this.selectedEMR;
    emr.details.Clinician_Assessed_Symptoms = selectedOption;
    this.normalUpdate(emr);
  }
    console.log("final ==>",selectedOption);
  }

  isnotObj(data){
    return typeof data !== 'object';
  }

  updateEMR(lab_result){
      console.log("updateEMR-->",lab_result);
      this.selectedEMR.details.labResult = lab_result;
      this.api.body = this.selectedEMR;
      this.api.updateEMR().subscribe(api => {
         console.log("in return updateEMR emr",api);
          this.api.queryAllEMR();
          this.api.getRuleList();
       }, error => {
        console.log("Problem updating EMR: " + error['error']['message'])
       })
  }

  // testUpdateCovid(){
  //   let lab_result = this.selectedEMR.labResult || {};
  //   lab_result["COVID_19"] = "positive";
  //   this.selectedEMR.details.labResult = lab_result;
  //     this.api.body = this.selectedEMR;
  //     this.api.updateEMR().subscribe(api => {
  //        console.log("in return testUpdateCovid emr",api);
  //        this.api.queryAllEMR();
  //        this.api.getRuleList();
  //      }, error => {
  //       console.log("Problem updating EMR: " + error['error']['message'])
  //      })
  // }

  // for patient and doctor user
  normalUpdate(emr){
   this.api.body = emr;
   console.log("in normalUpdate emr",this.api.body);
      this.api.updateEMR().subscribe(api => {
          console.log("in return normalUpdate emr",api);
          if(this.userType == "patient"){
            alert("Successfully Update EMR, please login again, to see the updates");
           }else{
            this.api.queryAllEMR();
            this.api.getRuleList();
           }
        }, error => {
        console.log("Problem updating EMR: " + error['error']['message'])
      })
  }

  // for lab user
  addLabResult() {
    this.labResultList.push({
      casename: '',
      result: 'positive'
    });
  }
  removeLabResult(i: number) {
    if(i != 0){
      this.labResultList.splice(i, 1);
    }
    
  }
  submitLabResult() {
    console.log("submitLabResult",this.labResultList);
    let emr = this.selectedEMR.labResult;
    let lab_result = {};
    for(let i=0; i<this.labResultList.length; i++){
      if(emr){//check first if label result duplicate or not
          if((Object.keys(emr)
          .find(key => key.toLowerCase() == this.labResultList[i].casename.toLowerCase()))){
            alert("This patient already have " + this.labResultList[i].casename + " lab result");
          }else{
            lab_result = emr || {};
            lab_result[this.labResultList[i].casename] = this.labResultList[i].result;
    
            this.updateEMR(lab_result);
          }
       
      }else{
        lab_result = {};
        lab_result[this.labResultList[i].casename] = this.labResultList[i].result;
        this.updateEMR(lab_result);
      }
    }
    
  }

  
}
