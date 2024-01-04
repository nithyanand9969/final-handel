import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  loggedInUserName: string = '';
  entityList: any;
  selectedMaterial: string = '';
  post:any;

  constructor( private router:Router){

  }
  logout(){

    this.router.navigate([""]);
  }
  
  servicerequest(){
    this.servicerequest

  }
  ngOnInit() {
    this.loggedInUserName = localStorage.getItem('userName') || '';
  }
}
