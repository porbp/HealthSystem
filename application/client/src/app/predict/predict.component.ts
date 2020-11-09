import { Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})
export class PredictComponent implements OnInit {
  // private EMRsData = new BehaviorSubject([]);
  // @Input() EMRs: Observable<any[]> = this.EMRsData.asObservable();
  
  EMRsList: any;
  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  CurrentReview: any;
  isFinishLoad: boolean = false;
  constructor(private api: ApiService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    // this.EMRs.subscribe(EMRList => {
    //   console.log("in ngOnInit cd ",EMRList);
    //   console.log("in ngOnInit this.EMRs ",this.EMRs);
    //   this.EMRsList = EMRList;

    //   this.cd.markForCheck();
    //   //this.createChartBar();
      
    // })
    this.api.orders$.subscribe(EMRList => {
      console.log("subscribe",EMRList)
      this.EMRsList = EMRList;
      
      if(this.EMRsList != undefined){
        this.createChartBar();
      }
     
      this.cd.markForCheck();

    })
      this.api.queryAllEMR();
  
  }
  


  createChartBar(){
    
     if(this.EMRsList.length >0){
      console.log("in createChartBar",this.EMRsList)
     let highRisk = 0;
     let lowRisk = 0;
     let total = 0;
     this.chartDatasets = [];
     this.chartLabels = ['High Risk of Having COVID19','Low Risk of Having COVID19']
     for(let i=0; i< this.EMRsList.length; i++){
       
       if(this.EMRsList[i].predict && this.EMRsList[i].predict.COVID_19.predictResult){
         highRisk++;
         total++;
       }else{
        total++;
         lowRisk++;
       }
     }
     
    //  temp["data"] = [highRisk,lowRisk];
    //  temp["label"] = "dataSet";
 
     console.log("in createChartBar -- ",highRisk,lowRisk)

    //  this.chartDatasets.push(temp);
     this.chartDatasets = [
      { data: [highRisk, lowRisk,0,2], label: 'N of predict' }
    ];
 
   this.chartColors= [
     {
       backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
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


}
