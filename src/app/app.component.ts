import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { loadingService } from './core/loading/services/loading.service';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'eAgendaWeb';

  isLoading$?: Observable<boolean>;

  constructor(
    private loadingService: loadingService,
    private router: Router
  ){
    this.router.events.subscribe((event: Event) => {
      this.updateLoadingStatus(event);
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.getLoadingStatus();
  }

  updateLoadingStatus(event: Event): void{
    if(event instanceof NavigationStart) this.loadingService.upload();

    else if(
      event instanceof NavigationEnd || 
      event instanceof NavigationCancel ||
      event instanceof NavigationError 
    ) this.loadingService.stop();
  }
}
