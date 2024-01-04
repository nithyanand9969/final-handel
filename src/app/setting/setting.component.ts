import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit  {
  loggedInUserName: string = '';
  entityList: any;
  selectedMaterial: string = '';
  post:any;
  activeTab: string = 'open';
  Logout(){

  }
  servicerequest(){

  }
  ngOnInit() {
    this.loggedInUserName = localStorage.getItem('userName') || '';
  }


}
