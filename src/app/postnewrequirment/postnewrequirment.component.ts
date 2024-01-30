import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NetworkcallService } from '../service/networkcall.service';
import { MatDialog } from '@angular/material/dialog';
import { ServicerequestComponent } from '../servicerequest/servicerequest.component';

@Component({
  selector: 'app-postnewrequirment',
  templateUrl: './postnewrequirment.component.html',
  styleUrls: ['./postnewrequirment.component.scss'],
})
export class PostnewrequirmentComponent implements OnInit {
  loggedInUserName = '';
  selectedMaterial = '';
  material!: FormGroup;
  entityList: any;
  isValidMaterialType: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private networkService: NetworkcallService,
    private dailog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loggedInUserName = localStorage.getItem('userName') || '';
    this.initializeForm();
  }

  servicerequest() {
    var _popup = this.dailog.open(ServicerequestComponent, {
      width: '20%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      data: {
        title: 'Service Request',
      },
    });
    _popup.afterClosed().subscribe(item=>{
      console.log(item)
    })
  }

  initializeForm(): void {
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

      // Populate formData with form values
      formData.append('material', this.material.get('material')?.value);
      formData.append('supplier', this.material.get('supplier')?.value);
      formData.append('payment', this.material.get('payment')?.value);
      formData.append('quantity', this.material.get('quantity')?.value);
      formData.append('unitprice', this.material.get('unitprice')?.value);

      console.log('Form Data:', formData);

      let creationAPIMethod: Observable<Object>;

      if (this.selectedMaterial === 'domestic') {
        creationAPIMethod =
          this.networkService.createDomesticMaterial(formData);
      } else if (this.selectedMaterial === 'international') {
        creationAPIMethod =
          this.networkService.createInternationalMaterial(formData);
      } else {
        console.error('Invalid material type selected.');
        return;
      }

      const jwtToken = this.getToken(); // Correctly retrieve the JWT token

      if (jwtToken) {
        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };

        creationAPIMethod.subscribe(
          (response) => {
            console.log(`${this.selectedMaterial} material created:`, response);
            // Optionally, navigate to another page or perform actions on success
          },
          (error) => {
            console.error(
              `Error creating ${this.selectedMaterial} material:`,
              error
            );
            // Handle errors here, display alerts, navigate to error pages, etc.
          }
        );
      } else {
        console.error('Token not available.');
        // Handle the scenario when the token is not available
      }
    } else {
      console.error('Form is invalid.');
      // Handle the scenario when the form is invalid
    }
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
