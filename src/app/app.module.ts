import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { SignUpModule } from './views/sign-up/sign-up.module';
import { LoginModule } from './views/login/login.module';
import { AuthService } from './core/auth/services/auth.service';

function logSaveUserFactory(authService: AuthService){
  return () => authService.logSaveUser();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true
    }),

    CoreModule,
    SignUpModule,
    LoginModule,
    DashboardModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: logSaveUserFactory,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
