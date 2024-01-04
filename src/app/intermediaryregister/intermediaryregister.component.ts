import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetworkcallService } from '../service/networkcall.service';

@Component({
  selector: 'app-intermediaryregister',
  templateUrl: './intermediaryregister.component.html',
  styleUrls: ['./intermediaryregister.component.scss']
})
export class IntermediaryregisterComponent implements OnInit {
  selectedImage: File | undefined;
  selectedFinancialDocument: File | undefined;
  intermediaryForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    private urlservice: NetworkcallService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.intermediaryForm = this.formBuilder.group({
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
      console.log('Selected financial document:', this.selectedFinancialDocument);
    } catch (error) {
      console.error('Error selecting financial document:', error);
    }
  }

  submitData() {
    this.loading = true;
    console.log('Submitting form...');
    console.log('Selected image:', this.selectedImage);
    console.log('Selected financial document:', this.selectedFinancialDocument);

    const formData = new FormData();
    const formValue = this.intermediaryForm.value;

    Object.keys(formValue).forEach((key) => {
      formData.append(key, formValue[key]);
    });

    formData.append('gst', this.selectedImage || '');
    formData.append('financial', this.selectedFinancialDocument || '');


this.urlservice.createintermediaters(formData).subscribe((res) => {
  console.log(res);
  this.router.navigate(['/admin/user']);
});
setTimeout(() => {
  this.loading = false; 
  this.router.navigate(['/admin/user']);
}, 2000); 
}
}
