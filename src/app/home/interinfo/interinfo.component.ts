import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-interinfo',
  templateUrl: './interinfo.component.html',
  styleUrls: ['./interinfo.component.scss']
})
export class InterinfoComponent {
  getIntermediator: any;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
   
 
    this.fetchIntermediatorDetails(); // Corrected method name
  }
  
  fetchIntermediatorDetails(): void { // Corrected method name
    this.authService.getIntermediatorDetails().subscribe(
      (res: any) => {
        this.getIntermediator = res;
        console.log('Intermediator details:', res);
      },
      (error) => {
        console.error('Error fetching intermediator details:', error);
      }
    );
  }
  

}
