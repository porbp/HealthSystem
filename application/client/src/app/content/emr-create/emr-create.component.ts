import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/index';

@Component({
  selector: 'app-emr-create',
  templateUrl: './emr-create.component.html',
  styleUrls: ['./emr-create.component.scss']
})
export class EmrCreateComponent implements OnInit {

  

  csvContent: string;
  data: Array<any> = [];
  properties:any = "";
  flag:boolean = false;
  newEMR: Object;
  dictHashMap: Map<object, Array<any>>;

  dictArrObj: Array<any> = [];
  
  //html
  @ViewChild('alert', { static: true }) alert: ElementRef;
  alertMessageType: string;
  alertMessage: String;
  isAnyLoading = false;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  // ===== add emr from csv ======

  onFileSelect(input: HTMLInputElement) {

    const files = input.files;
    var fileTypes = ['csv'];  

    if (files && files.length) {
      var extension = input.files[0].name.split('.').pop().toLowerCase(), 
      isSuccess = fileTypes.indexOf(extension) > -1;  
      if(isSuccess){
        const fileToRead = files[0];

        const fileReader = new FileReader();
        fileReader.onloadend = this.onFileLoad.bind(this);
  
        fileReader.readAsText(fileToRead, "UTF-8");
      }else{
        console.log("Error");
      }

    
    }
  }

  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;

    let flag = false;
    let objarray: Array<any> = [];
    let prop: Array<any> = [];
    let size: any = 0;
    let patientId: any = 1;
    let doctorId: any = 1;


    for (const line of this.csvContent.split(/[\r\n]+/)) {
      if (flag) {

        let obj = {};
        for (let k = 0; k < size; k++) {
          
          //Dynamic Object Properties

          obj[prop[k]] = line.split(',')[k];

        }
      

        if(obj["age"] == undefined || obj["cxr_label"] == undefined) {
         //filter out
        }else{//group 
          obj["patientId"] = "pt"+patientId;
          obj["doctorId"] = "dt"+doctorId;
          obj["gender"] = Math.floor(Math.random() * Math.floor(2));
          
          obj["symptoms"]= { "days_since_symptom_onset":obj["days_since_symptom_onset"],
          "cough":obj["cough"],
          "cough_severity":obj["cough_severity"],
          "fever":obj["fever"],
          "sob":obj["sob"],
          "sob_severity":obj["sob_severity"],
          "diarrhea":obj["diarrhea"],
          "fatigue":obj["fatigue"],
          "headache":obj["headache"],
          "loss_of_smell":obj["loss_of_smell"],
          "loss_of_taste":obj["loss_of_taste"],
          "runny_nose":obj["runny_nose"],
          "muscle_sore":obj["muscle_sore"],
          "sore_throat":obj["sore_throat"],
        };
        obj["Radiological_Findings"] = { "cxr_findings ":obj["cxr_findings "],
        "cxr_impression ":obj["cxr_impression"],
        "cxr_label":obj["cxr_label"],
        "cxr_link":obj["cxr_link"]
        };

        obj["Extended_Laboratory_Results"] = { "WBC ":obj["WBC"],
        "Hgb":obj["Hgb"],
        "Plt":obj["Plt"],
        "Na":obj["Na"],
        "K":obj["K"],
        "Cl":obj["Cl"],
        "CO2":obj["CO2"],
        "BUN":obj["BUN"],
        "Cr":obj["Cr"],
        "Troponin":obj["Troponin"],
        "D-dimer":obj["D-dimer"],
        "Ferritin":obj["Ferritin"],
        "Pro-calcitonin ":obj["Pro-calcitonin"],
        "INR ":obj["INR"],
        "BNP":obj["BNP"],
        "Fibrinogen":obj["Fibrinogen"],
        "Gluc":obj["Gluc"],
        "A1C":obj["A1C"],
        "CRP ":obj["CRP"]
        };

        obj["Comorbidities"] = { "diabetes":obj["diabetes"],
        "chd":obj["chd"],
        "htn":obj["htn"],
        "cancer":obj["cancer"],
        "asthma":obj["asthma"],
        "copd":obj["copd"],
        "autoimmune_dis":obj["autoimmune_dis"],
        "smoker":obj["smoker"]
        };

        //lab + patient
        obj["Vitals"] = { "pulse":obj["pulse"],
        "sys":obj["sys"],
        "dia":obj["dia"],
        "rr":obj["rr"],
        "sats":obj["sats"],
        "copd":obj["copd"],
        "autoimmune_dis":obj["autoimmune_dis"],
        "smoker":obj["smoker"],
        "temperature":obj["temperature"]
        };
        //doctor f2f
        obj["Clinician_Assessed_Symptoms"] = { "ctab":obj["ctab"],
        "labored_respiration":obj["labored_respiration"],
        "rhonchi":obj["rhonchi"],
        "wheezes":obj["wheezes"]
        };
        //lab
        obj["Radiological_Findings"] = { "cxr_findings":obj["cxr_findings"],
        "cxr_impression":obj["cxr_impression"],
        "cxr_label":obj["cxr_label"],
        "cxr_link":obj["cxr_link"]
        };
        
        

        for(let i in obj["symptoms"]){
         delete obj[i];
        }
        for(let i in obj["Extended_Laboratory_Results"]){
          delete obj[i];
        }
        for(let i in obj["Comorbidities"]){
          delete obj[i];
        }
        for(let i in obj["Vitals"]){
          delete obj[i];
        }
        for(let i in obj["Clinician_Assessed_Symptoms"]){
          delete obj[i];
        }
        for(let i in obj["Radiological_Findings"]){
          delete obj[i];
        }
        obj["Radiological_Findings"]

        
          patientId++;
          if(patientId > doctorId*15){
            doctorId++;
          }
          //console.log(obj);
          objarray.push(obj);
          
        }

      } else {
        for (let k = 0; k < line.split(',').length; k++) {
          size = line.split(',').length;
          //Removing all the spaces to make them usefull
          prop.push(line.split(',')[k].replace(/ /g, ''));
        }
        flag = true;
      }
    }
    this.data = objarray;
    console.log("in->",this.data);
    this.properties = [];
    this.flag = true;

  }
  
 
  create() {
    this.api.body = this.data;
    console.log("in == create", this.data);
    this.isAnyLoading = true;
    this.api.createEMRFromList().subscribe(api => {
       console.log("eturn createEMRFromList", api);
       this.openAlert("Success","Successfully Create EMR  ",true);
       this.api.queryAllEMR();
       this.isAnyLoading = false;
     }, error => {
      this.openAlert("Error",error['error']['message'],false);
      this.isAnyLoading = false;
       console.log("Problem creating Order: " + error['error']['message'])
     })
  }

   
//handle alert
  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }
  
  openAlert(message,type,isSuccess) {
    this.alertMessage = message;
    this.alertMessageType = type;
    if(isSuccess){
      this.alert.nativeElement.classList.add('alert-success');
    }else{
      this.alert.nativeElement.classList.add('alert-danger');
    }
    this.alert.nativeElement.classList.add('show');
  }
// End handle alert

  


  // ===== End add emr from csv ======



}
