import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isCollapse: boolean = true;
  isDarkMode: boolean = true;

  toggleMode(){
    this.isDarkMode = !this.isDarkMode;
  }
}
