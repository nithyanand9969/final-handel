import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent {

  constructor(private chart:NgChartsModule){}
 
  LineCharData = {
    labels:["Material","Requirement "],
    datasets:[
      {
      data:[0,5],
      label:'Material',
      fill:true,
      backgroudColor:'rgba(255,255,0,0)',
      borderColor:'black',
      tension:0.5

    } 
   ]
  }



 

}
