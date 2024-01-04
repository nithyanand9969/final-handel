import { Component } from '@angular/core';

@Component({
  selector: 'app-servicerequest',
  templateUrl: './servicerequest.component.html',
  styleUrls: ['./servicerequest.component.scss']
})
export class ServicerequestComponent { callbackData = {
  name: '',
  phoneNumber: '',
  message: ''
};

submitCallback() {
  // Handle submission logic here (e.g., send callback request to backend)
  console.log('Callback data:', this.callbackData);
  // You can add logic to send the callback request to the server here
  // Example: service calls, HTTP requests, etc.
  // Once submitted, you might want to close the form.
  this.closeCallbackForm();
}

closeCallbackForm() {
  // Logic to close the callback form, hide the modal, etc.
  // This might involve updating a property to toggle visibility or using a modal library
  console.log('Closing callback form');
}
}