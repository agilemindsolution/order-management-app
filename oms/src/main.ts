import { bootstrapApplication } from '@angular/platform-browser';
// import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';
import { App } from './app/app';
// import { AppRoutingModule } from './app/app.routing.module';

bootstrapApplication(
  App,
  appConfig
  //   {
  //   providers: [...appConfig.providers, importProvidersFrom(AppRoutingModule)],
  // }
).catch((err) => console.error(err));
