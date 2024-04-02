import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss'],
})
export class UserinfoComponent {
  getUserDetails: any;
  selectedEntity: any;
  showModal = false;
  confirmDelete = false;
  showEditModal = false; // Added flag for edit modal
  snackBar: any;
  entity: any;

  constructor(
    private authService: AuthService,
    private router: Router,
 
  ) {}

  ngOnInit(): void {
    this.fetchCorporateUsers();
  }

  fetchCorporateUsers(): void {
    this.authService.getUserDetails().subscribe(
      (res: any) => {
        this.getUserDetails = res;
        console.log('Corporate users:', res);
      },
      (error) => {
        console.error('Error fetching corporate users:', error);
      }
    );
  }

  updateEntity(entity: any): void {
    if (entity && entity.corporateId) {
      this.authService.updateCorporate(entity).subscribe(
        (data) => {
          this.closeEditModal();
          this.fetchCorporateUsers();
          console.log(data);
          this.router.navigate(['/admin/userinfo']); 
        },
        (error) => {
          console.error('Error updating entity:', error);
          
        }
      );
    } else {
      console.error('Selected entity or corporateId is missing.');
    }
  }
  openEditModal(entity: any): void {
    this.selectedEntity = entity;
    this.showEditModal = true; 
  }

  closeEditModal(): void {
    this.showEditModal = false;
 
  }

    openModal(registrationEntity: any): void {
    this.selectedEntity = registrationEntity;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.confirmDelete = false;
  }

  pauseEntity(entity: any): void {
    if (!entity || !entity.corporateId) {
      console.error('Selected entity or corporateId is missing.');
      return;
    }
  
    const confirmation = confirm('Are you sure you want to pause this account?'); 
    
    if (confirmation) {
      this.authService.pauseCorporate(entity.corporateId).subscribe(
        (data) => {
          console.log('Entity paused successfully:', data);
        
          this.fetchCorporateUsers();
        },
        (error) => {
          console.error('Error pausing entity:', error);
         
        }
      );
    }
  }
  
  
  
}
