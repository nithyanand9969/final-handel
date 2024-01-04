import { Component } from '@angular/core';
import { NetworkcallService } from '../service/networkcall.service';

@Component({
  selector: 'app-corporate-users',
  templateUrl: './corporate-users.component.html',
  styleUrls: ['./corporate-users.component.scss']
})
export class CorporateUsersComponent  {

  corporateuser: any;
  selectedUser: any;

  constructor(public url: NetworkcallService) { }

  ngOnInit(): void {
    // this.url.getcorporateuser().subscribe((res: any) => {
    //   this.corporateuser = res;
    // });
  }

  selectUser(user: any): void {
    this.selectedUser = user;
  }
}