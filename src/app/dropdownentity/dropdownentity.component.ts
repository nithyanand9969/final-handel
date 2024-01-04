import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dropdownentity',
  templateUrl: './dropdownentity.component.html',
  styleUrls: ['./dropdownentity.component.scss']
})
export class DropdownentityComponent implements OnInit {
  entityList: string[] = []; // Initialize entityList as an array of strings

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchEntities();
  }

  fetchEntities(): void {
    this.authService.getUserDetails().subscribe(
      (userDetails: any[]) => {
        // Assuming userDetails contains an array of registrationEntities with 'entityName' property
        this.entityList.push(...userDetails[0]?.registrationEntities?.map((entity: { entityName: any; }) => entity.entityName) || []);
        console.log('Corporate users:', userDetails);
      },
      (error) => {
        console.error('Error fetching corporate users:', error);
      }
    );

    this.authService.getTraderDetails().subscribe(
      (traderDetails: any[]) => {
        // Assuming traderDetails contains an array of tradersEntities with 'entityName' property
        this.entityList.push(...traderDetails[0]?.tradersEntities?.map((trader: { entityName: any; }) => trader.entityName) || []);
        console.log('Trader details:', traderDetails);
      },
      (error) => {
        console.error('Error fetching trader details:', error);
      }
    );

    this.authService.getIntermediatorDetails().subscribe(
      (intermediatorDetails: any[]) => {
        // Assuming intermediatorDetails contains an array of intermediaryEntities with 'entityName' property
        this.entityList.push(...intermediatorDetails[0]?.intermediaryEntities?.map((intermediator: any) => intermediator.entityName) || []);
        console.log('Intermediator details:', intermediatorDetails);
      },
      (error) => {
        console.error('Error fetching intermediator details:', error);
      }
    );
  }

  selectUser(user: any): void {
    // Perform actions on user selection if needed
    console.log('Selected User:', user);
  }
}
