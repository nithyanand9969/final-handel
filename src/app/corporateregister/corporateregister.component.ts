import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetworkcallService } from '../service/networkcall.service';

@Component({
  selector: 'app-corporateregister',
  templateUrl: './corporateregister.component.html',
  styleUrls: ['./corporateregister.component.scss'],
})
export class CorporateregisterComponent implements OnInit {
  selectedImage: File | undefined;
  selectedFinancialDocument: File | undefined;
  clientReg!: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    private urlservice: NetworkcallService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.clientReg = this.formBuilder.group({
      entityName: ['', Validators.required],
      iecCode: ['', Validators.required],
      userName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      beneficiary: ['', Validators.required],
      accountNumber: ['', Validators.required],
      swiftCode: ['', Validators.required],
    });
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onFinancialDocumentSelected(event: any) {
    try {
      this.selectedFinancialDocument = event.target.files[0];
      console.log(
        'Selected financial document:',
        this.selectedFinancialDocument
      );
    } catch (error) {
      console.error('Error selecting financial document:', error);
    }
  }

  submitData() {
    if (this.clientReg.invalid) {
      // If the form is invalid, display errors and prevent form submission
      console.log('Form is invalid. Please check the fields.');
      // Handle displaying validation errors to the user as needed.
      return;
    }

    this.loading = true;
    console.log('Submitting form...');
    console.log('Selected image:', this.selectedImage);
    console.log('Selected financial document:', this.selectedFinancialDocument);

    const formData = new FormData();
    const formValue = this.clientReg.value;

    Object.keys(formValue).forEach((key) => {
      formData.append(key, formValue[key]);
    });

    formData.append('gst', this.selectedImage || '');
    formData.append('financial', this.selectedFinancialDocument || '');

    this.urlservice.createCorporateRegi(formData).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/admin/user']);
      },
      (error) => {
        console.error('Error submitting form:', error);
        // Handle the error response and display an appropriate message to the user.
      }
    );

    setTimeout(() => {
      this.loading = false;
      // Navigate after the response or error handling
      this.router.navigate(['/admin/user']);
    }, 2000);
  }
}
