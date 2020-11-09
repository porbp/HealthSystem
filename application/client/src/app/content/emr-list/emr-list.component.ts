
import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild} from '@angular/core';
import { ApiService } from '../../services/index';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-emr-list',
  templateUrl: './emr-list.component.html',
  styleUrls: ['./emr-list.component.scss']
})


export class EmrListComponent implements OnInit {

  userType: string = "";
  clickEdit: boolean = false;

  //load EMR list
  EMRs: any;
  selectedEMR: any;

  //html
  @ViewChild('alert', { static: true }) alert: ElementRef;
  alertMessageType: string;
  alertMessage: String;

  
  page = 1;
  pageSize = 10;
  EMRsList: any = [];
  loadNum: any = 0;

  isAnyLoading = true;
  isFinishLoad: boolean = false;

  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
 
  

  constructor(private api: ApiService, private cd: ChangeDetectorRef, private userService: UserService) {
    
   }


  ngOnInit(): void {
  this.isAnyLoading = true;
    this.api.orders$.subscribe(EMRList => {
      
      this.EMRs = EMRList;
     //this.EMRs.sort((a,b) => (a.currentEMRState.COVID_19 < b.currentEMRState.COVID_19) ? 1 : ((b.currentEMRState.COVID_19 < a.currentEMRState.COVID_19) ? -1 : 0));
     this.EMRs.sort((a,b) => (parseInt((a.patientId).split("pt")[1].split(" ")[0]) - parseInt((b.patientId).split("pt")[1].split(" ")[0])));
      // : ((parseInt((b.patientId).split("pt")[1].split(" ")[0]) < parseInt((a.patientId).split("pt")[1].split(" ")[0])) ? -1 : 0));
      
      // for show as pagination
      this.refreshEMRList();

      if(this.EMRs[0] != "none"){
        this.createChartBar();
        if(this.EMRs.length>0){
           this.isAnyLoading = false;
        }
      }else{
          this.isAnyLoading = false;
      }

      this.cd.markForCheck();

      //init select first emr from list for show
      this.selectEMR(this.EMRs[0])
    })
    this.api.queryAllEMR();
    this.userType = this.userService.getCurrentUser().usertype;


  }
  


  refreshEMRList() {
    this.EMRsList = this.EMRs
    .map((emr, i) => ({id: i + 1, ...emr}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }



  createChartBar(){ 
    if(this.EMRs.length > 0){
    console.log("in createChartBar",this.EMRs)
    let highRisk = 0;
    let lowRisk = 0;
    let total = 0;
    this.chartDatasets = [];
    this.chartLabels = ['High Risk of Having COVID19','Low Risk of Having COVID19']
    for(let i=0; i< this.EMRs.length; i++){
      if(this.EMRs[i].predict && this.EMRs[i].predict.COVID_19){
      if(this.EMRs[i].predict.COVID_19.predictResult){
        highRisk++;
        total++;
      }else{
      total++;
        lowRisk++;
      }
    }
    }
    

    console.log("in createChartBar -- ",highRisk,lowRisk)

    this.chartDatasets = [
    { data: [highRisk, lowRisk,0,2], label: 'N of predict' }
  ];

  this.chartColors= [
    {
      backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)'
    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)'
    ],

      borderWidth: 2,
    }
  ];

    this.chartOptions= {
      responsive: true
    };
  this.isFinishLoad = true;

    }
    
  }

  async testUpdateLabresult(){
      this.isAnyLoading = true;
      console.log("in testUpdateLabresult ",this.EMRsList);
      for(var i=0; i < this.EMRsList.length; i++){
        if(this.EMRsList[i].currentEMRState.COVID_19 == 1 
          || this.EMRsList[i].currentEMRState.COVID_19 == undefined){
            console.log("in testUpdateLabresult--> ", this.EMRsList[i].currentEMRState);
            let lab_result = this.EMRsList[i].labResult || {};
            let COVID_19 = "COVID_19";
            lab_result[COVID_19] = this.EMRsList[i].covid19_test_results;
            this.EMRsList[i].details.labResult = lab_result;
            this.api.body = this.EMRsList[i];
            console.log("in testUpdateLabresult api--> ", this.EMRsList[i].lab_result);
            let respose = await this.api.updateEMR2();
            console.log(respose);
          }
        }
        this.api.queryAllEMR();
        this.api.getRuleList();
        this.isAnyLoading = false;
        this.openAlert("Success","Successfully testUpdateLabresult on EMRs ",true);
        console.log("END testUpdateLabresult emr");
    
  }

 

  isnotObj(data){
    return typeof data !== 'object';
  }

  //===== select emr list======
  selectEMR(emr){
      this.selectedEMR = emr;
      this.clickEdit = false;
  }
  //===== End select emr list======


  //===== edit emr ======
  public updateEMR(emr){
      switch (this.userType.toLowerCase()) {
        case "lab": {
          this.clickEdit = true;
            break;
        }
        case "doctor": {
          this.clickEdit = true;
          break;
        }
        default:{}
        }
    }
  //===== End edit emr ======


  // ===== Remove EMR =====
  public removeEMR(emr){
    console.log('remove -- emr', emr)
    this.api.id = emr.patientId;
        this.api.deleteEMR().subscribe(res => {
          console.log(res);
          this.api.queryAllEMR();
          this.openAlert("Success","Successfully Remove EMR ",true);
        }, error => {
          this.openAlert("Error",error['error']['message'],false);
          console.log(JSON.stringify(error));
          console.log("Problem deleting order: " + error['error']['message'])
        });
  }

  public removeRuleList(){
    console.log('remove -- rule')
        this.api.deleteRuleList().subscribe(res => {
          console.log(res);
          this.openAlert("Success","Successfully Remove RuleList ",true);
        }, error => {
          this.openAlert("Error",error['error']['message'],false);
          console.log(JSON.stringify(error));
          console.log("Problem deleting order: " + error['error']['message'])
        });
  }

  public removeAllEMR(){
    this.isAnyLoading = true;
    this.api.deleteALLEMR().subscribe(res => {
      console.log(res);
      this.openAlert("Success","Successfully removeAllEMR ",true);
      this.isAnyLoading = false;
      this.api.queryAllEMR();
      this.api.getRuleList();
    }, error => {
      this.openAlert("Error",error['error']['message'],false);
      this.isAnyLoading = false;
      console.log(JSON.stringify(error));
      console.log("Problem deleting order: " + error['error']['message'])
    });

  }
  // ===== End Remove EMR =====

  // ===== Handle Alert =====
  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }
  openAlert(message,type,isSuccess) {
    this.alertMessage = message;
    this.alertMessageType = type
    if(isSuccess){
      this.alert.nativeElement.classList.add('alert-success');
    }else{
      this.alert.nativeElement.classList.add('alert-danger');
    }
    this.alert.nativeElement.classList.add('show');
  }
  // ===== End Handle Alert =====



}
