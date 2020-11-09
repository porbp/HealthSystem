import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/index';
// For MDB Angular Free
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {


  public chartType: string = 'line';

  public chartDatasets: Array<any> = [];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


  Rule: any;
  CurrentReview: any;
  isFinishLoad: boolean = false;
  constructor(private api: ApiService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.api.rule$.subscribe(rule => {
      this.Rule = rule;
      console.log("-->",this.Rule);
      let reviews;
      for(let obj in rule){
        //if that rule have reviews -> create graph
        if(typeof rule[obj] == 'object' && rule[obj] != null){
          if(rule[obj].reviews && rule[obj].reviews.length > 0){
            reviews = rule[obj].reviews;
            this.createChart(reviews);
          }
        }
      }
      this.cd.markForCheck();
    })
    this.api.getRuleList();
  }

  islastReview(detail){
    if(this.Rule.COVID_19.reviews.pop() == detail){
      return true;
    }
    return false;
  }
 

  createChart(reviews){
    this.chartDatasets = [];
    let AccuracyData = [0];
    let Accuracytemp = {};

    let FNRData = [0];
    let FNRtemp = {};
    this.chartLabels = ['0']
    for(let i=0; i< reviews.length; i++){
      
      AccuracyData.push(reviews[i].ACC);
      FNRData.push(reviews[i].FNR);

      let tempLabel = "version "+ reviews[i].version;
      this.chartLabels.push(tempLabel);
      // if(this.Rule.COVID_19.currentVersion == reviews[i].version){ 
      // }
    }
    Accuracytemp["data"] = AccuracyData;
    Accuracytemp["label"] = "Acuuracy Rate";

    FNRtemp["data"] = FNRData;
    FNRtemp["label"] = "False Negative Rate";

    this.chartDatasets.push(Accuracytemp,FNRtemp);


  this.chartColors= [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  this.chartOptions= {
    responsive: true
  };
  this.isFinishLoad = true;

  }

}
