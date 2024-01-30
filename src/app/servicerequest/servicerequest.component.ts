import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-servicerequest',
  templateUrl: './servicerequest.component.html',
  styleUrls: ['./servicerequest.component.scss']
})
export class ServicerequestComponent implements OnInit{ 
  inputdata:any;
  closemessage='closed used Directive';

  constructor(@Inject(MAT_DIALOG_DATA)public data:any,private ref:MatDialogRef<ServicerequestComponent> ,private builder:FormBuilder){

  }
  ngOnInit(): void {
   this.inputdata=this.data;
  }

  

  closeserviceticket(){
    this.ref.close('Closed Using Button');
  }

  myform=this.builder.group({
    description:this.builder.control(''),
    phone:this.builder.control(''),
  });

  Saveuser(){
    console.log(this.myform.value);

  }
}