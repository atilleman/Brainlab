import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core'; // ✅ very important

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { DashboardState } from './app/state/dashboard.state';
import { HomeComponent } from './app/home/home.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: HomeComponent }
    ]),
    importProvidersFrom( // ✅ very important
      NgxsModule.forRoot([DashboardState]),
      NgxsLoggerPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      NgxSmartModalModule.forRoot(),
    )
  ]
});
