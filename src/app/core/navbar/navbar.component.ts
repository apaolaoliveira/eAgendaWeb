import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserTokenViewModel } from '../auth/models/user-token.view-model';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isCollapse: boolean = true;
  user$?: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private route: Router
  ){}

  ngOnInit(): void {
    this.user$ = this.authService.getAuthUser()
    .pipe(
      map((user) => {
        if(!user) return false;
        else return true;
      })
    );
  }

  logOut(): void{
    this.authService.logOut().subscribe(() => {
      this.route.navigate(['/login']);
    });
  }
}
