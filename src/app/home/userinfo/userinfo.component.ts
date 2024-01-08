import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
        () => {
          this.closeEditModal();
          this.fetchCorporateUsers();
          this.toastr.success('Entity updated successfully!', 'Success');
          console.log('Redirecting...');
          this.router.navigate(['/admin/userinfo']); // Redirect after successful update
        },
        (error) => {
          console.error('Error updating entity:', error);
          this.toastr.error('Failed to update entity!', 'Error');
        }
      );
    } else {
      console.error('Selected entity or corporateId is missing.');
    }
  }
  openEditModal(entity: any): void {
    this.selectedEntity = entity;
    this.showEditModal = true; // Set showEditModal to true to display the edit modal
  }

  closeEditModal(): void {
    this.showEditModal = false;
 
  }

  deleteEntity(): void {
    if (this.selectedEntity && this.selectedEntity.corporateId) {
      this.authService.deleteCorporate(this.selectedEntity.corporateId).subscribe(
        () => {
          this.closeModal();
          this.fetchCorporateUsers();
          this.toastr.success('Entity deleted successfully!', 'Success');
          this.router.navigate(['/admin/userinfo']);
          console.log('Redirecting...');
           // Redirect after successful deletion
        },
        (error) => {
          console.error('Error deleting entity:', error);
          this.toastr.error('Failed to delete entity!', 'Error');
        }
      );
    } else {
      console.error('Selected entity or corporateId is missing.');
    }
  }

  openModal(registrationEntity: any): void {
    this.selectedEntity = registrationEntity;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.confirmDelete = false;
  }
  

}
