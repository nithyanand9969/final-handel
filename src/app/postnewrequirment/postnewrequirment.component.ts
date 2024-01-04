import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NetworkcallService } from '../service/networkcall.service';

@Component({
  selector: 'app-postnewrequirment',
  templateUrl: './postnewrequirment.component.html',
  styleUrls: ['./postnewrequirment.component.scss']
})
export class PostnewrequirmentComponent implements OnInit {
  loggedInUserName = '';
  selectedMaterial = '';
  material!: FormGroup;
  entityList: any;
  isValidMaterialType: any;
  servicerequest: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private networkService: NetworkcallService
  ) {}

  ngOnInit(): void {
    // Fetch logged-in user information
    this.loggedInUserName = localStorage.getItem('userName') || '';
    this.initializeForm();
  }

  initializeForm(): void {
    // Initialize the form with validation rules
    this.material = this.formBuilder.group({
      material: ['', Validators.required],
      supplier: ['', Validators.required],
      payment: ['', Validators.required],
      quantity: ['', Validators.required],
      unitprice: ['', Validators.required],
    });
  }

  submitData(): void {
    if (this.material.valid) {
      const formData = new FormData();
  
      // Explicitly add each form field and its value to the FormData
      formData.append('material', this.material.get('material')?.value);
      formData.append('supplier', this.material.get('supplier')?.value);
      formData.append('payment', this.material.get('payment')?.value);
      formData.append('quantity', this.material.get('quantity')?.value);
      formData.append('unitprice', this.material.get('unitprice')?.value);
  
      console.log('Form Data:', formData); // Log form data
  
      let creationAPIMethod: Observable<Object>;
  
      // Determine which API method to call based on the selected material type
      if (this.selectedMaterial === 'domestic') {
        creationAPIMethod = this.networkService.createDomesticMaterial(formData);
      } else if (this.selectedMaterial === 'international') {
        creationAPIMethod = this.networkService.createInternationalMaterial(formData);
      } else {
        console.error('Invalid material type selected.');
        return;
      }
  
      const token = this.getToken(); // Retrieve token here
  
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`
        };
  
        creationAPIMethod.subscribe(
          (response) => {
            console.log(`${this.selectedMaterial} material created:`, response);
            this.router.navigate(['/users']);
          },
          (error) => {
            console.error(`Error creating ${this.selectedMaterial} material:`, error);
            // Handle error response (e.g., display an error message to the user)
          }
        );
      } else {
        console.error('Token not available.');
        this.router.navigate(['/login']);
      }
    } else {
      console.error('Form is invalid.');
      // Optionally, display an error message to the user
    }
  }
  
  logout(): void {
    this.router.navigate(['/login']);
  }

  // Method to retrieve bearer token (replace this with your actual token retrieval logic)
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
