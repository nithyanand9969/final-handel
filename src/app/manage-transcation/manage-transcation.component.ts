import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-transcation',
  templateUrl: './manage-transcation.component.html',
  styleUrls: ['./manage-transcation.component.scss'],
})
export class ManageTranscationComponent {
  loggedInUserName: string = '';

  ngOnInit() {
    this.loggedInUserName = localStorage.getItem('userName') || '';
  }

  logout() {}
  servicerequest() {}
}
