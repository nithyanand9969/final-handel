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
    snackBar: any;

    constructor(private authService: AuthService,private router: Router,private toastr: ToastrService) {}

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
    
    deleteEntity(): void {
      if (this.selectedEntity && this.selectedEntity.corporateId) {
        this.authService.deleteCorporate(this.selectedEntity.corporateId)
          .subscribe(
            () => {
              this.closeModal();
              this.fetchCorporateUsers();
              this.toastr.success('Entity deleted successfully!', 'Success');
              console.log('Redirecting...');
              this.router.navigate(['/admin/userinfo']); // Redirect to '/admin/userinfo' after successful deletion
            },
            (error) => {
              console.error('Error deleting entity:', error);
              // Handle error scenario here
              this.toastr.error('Failed to delete entity!', 'Error');
            }
          );
      } else {
        console.error('Selected entity or corporateId is missing.');
        // Handle missing entity scenario here
      }
    }
    
    openModal(registrationEntity: any): void {
      this.selectedEntity = registrationEntity;
      this.showModal = true; // Display the modal
    }
    
    closeModal(): void {
      this.showModal = false; // Hide the modal
      this.confirmDelete = false; // Reset the delete confirmation flag
    }
  }