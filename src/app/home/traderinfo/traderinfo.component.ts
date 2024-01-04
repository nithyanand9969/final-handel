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
deleteTrader() {
throw new Error('Method not implemented.');
}
  deleteEntity() {
    throw new Error('Method not implemented.');
  }
  getTraderDetails: any;
  selectedTraderEntity: any;
  showModal: boolean = false;
  confirmDelete: boolean = false;

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

  deleteTraderEntity(): void {
    if (this.selectedTraderEntity && this.selectedTraderEntity.traderId) {
      this.authService
        .deleteTrader(this.selectedTraderEntity.traderId)
        .subscribe(
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
}
