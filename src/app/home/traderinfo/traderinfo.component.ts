import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-traderinfo',
  templateUrl: './traderinfo.component.html',
  styleUrls: ['./traderinfo.component.scss'],
})
export class TraderinfoComponent {
  getTraderDetails: any;
  selectedTraderEntity: any;
  showModal: boolean = false;
  confirmDelete: boolean = false;
  snackBar: any;
  showEditModal: boolean = false;
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchTraderDetails();
  }

  fetchTraderDetails(): void {
    this.authService.getTraderDetails().subscribe(
      (res: any) => {
        this.getTraderDetails = res;
        console.log('Trader details:', res);
      },
      (error) => {
        console.error('Error fetching trader details:', error);
      }
    );
  }

  deleteEntity(): void {
    if (this.selectedTraderEntity && this.selectedTraderEntity.traderId) {
      this.authService.deleteTrader(this.selectedTraderEntity.traderId).subscribe(
        () => {
          this.closeModal();
          this.fetchTraderDetails();
          this.toastr.success('Entity deleted successfully!', 'Success');
          console.log('Redirecting...');
          this.router.navigate(['/admin/traderinfo']); // Redirect to '/admin/traderinfo' after successful deletion
        },
        (error) => {
          console.error('Error deleting entity:', error);
          this.toastr.error('Failed to delete entity!', 'Error');
        }
      );
    } else {
      console.error('Selected trader entity or traderId is missing.');
    }
  }

  openModal(traderRegistration: any): void {
    this.selectedTraderEntity = traderRegistration;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false; // Hide the modal
    this.confirmDelete = false; // Reset the delete confirmation flag
  }
  // Inside TraderinfoComponent class
// ...


// Method to open the edit modal
openEditModal(traderRegistration: any): void {
  this.selectedTraderEntity = { ...traderRegistration }; // Make a copy of the selected entity
  this.showEditModal = true;
}

// Method to close the edit modal without saving changes
closeEditModal(): void {
  this.showEditModal = false;
}

// Method to save the edited entity
saveEditedEntity(): void {
  // Perform actions to save the edited entity (e.g., calling a service to update the entity)
  // Once saved, close the edit modal and optionally refresh the displayed data
  // For example:
  // this.authService.updateTrader(this.selectedTraderEntity).subscribe(
  //   () => {
  //     this.closeEditModal();
  //     this.fetchTraderDetails(); // Refresh data if needed
  //     this.toastr.success('Entity updated successfully!', 'Success');
  //   },
  //   (error) => {
  //     console.error('Error updating entity:', error);
  //     this.toastr.error('Failed to update entity!', 'Error');
  //   }
  // );
}

}
