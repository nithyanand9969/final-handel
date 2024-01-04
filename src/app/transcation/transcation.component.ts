import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transcation',
  templateUrl: './transcation.component.html',
  styleUrls: ['./transcation.component.scss']
})
export class TranscationComponent {
  activeTab: string = 'open';
  loggedInUserName: string = '';
  entityList: any;
  selectedMaterial: string = '';
 
  materials = [ // Dummy data for the table
    { name: 'Company 1', status: 'Active', progress: '75%', action: 'Manage' },
    { name: 'Company 2',  status: 'Active', progress: '40%', action: 'Manage' },
    { name: 'Company 3',  status: 'Active', progress: '100%', action: 'Manage' },
    { name: 'Company 4', status: 'Active', progress: '20%', action: 'Manage' }
  ];

  openTab(tabName: string) {
    this.activeTab = tabName;
  }
  parseProgress(progress: string): number {
    const numericValue = parseFloat(progress.slice(0, -1));
    return isNaN(numericValue) ? 0 : numericValue;
  }

  // Function to get the class name based on progress value
  getProgressBarColor(progress: string): string {
    const value = this.parseProgress(progress);

    // Customize thresholds and corresponding classes as per your requirement
    if (value <= 33) {
      return 'orange-progress';
    } else if (value <= 66) {
      return 'green-progress';
    } else {
      return 'red-progress';
    }
  }
  Logout(){

  }
servicerequest(){

}
ngOnInit() {
  this.loggedInUserName = localStorage.getItem('userName') || '';
}
}