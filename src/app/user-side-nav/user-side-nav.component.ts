import { Component } from '@angular/core';
import {
  faDashboard,
  faLocation,
  faShop,
  faBox,
  faMoneyBill,
  faChartBar,
  faContactBook,
  faHand,
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user-side-nav',
  templateUrl: './user-side-nav.component.html',
  styleUrls: ['./user-side-nav.component.scss']
})
export class UserSideNavComponent {
  faDashboard = faDashboard;
  faLocation = faLocation;
  faShop = faShop;
  faBox = faBox;
  faMoneyBill = faMoneyBill;
  faChartBar = faChartBar;
  faContactBook = faContactBook;
  faHand = faHand;

  isDropdownActive: boolean = false;

  // toggleTransaction() {
  //   const demoAcc = document.getElementById("demoAcc");
  //   if (demoAcc) {
  //     demoAcc.classList.toggle("w3-hide"); // Toggle the "w3-hide" class
  //   }
  // }
  toggleDropdown(event: Event) {
    const dropdown = event.target as HTMLElement;
    dropdown.classList.toggle('active');
    const dropdownContent = dropdown.nextElementSibling as HTMLElement;
    if (dropdownContent.style.display === 'none') {
      dropdownContent.style.display = 'flex';
    } else {
      dropdownContent.style.display = 'none';
    }
  }
}
