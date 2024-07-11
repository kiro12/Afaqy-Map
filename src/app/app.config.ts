import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
interface applicationConfig extends ApplicationConfig{
  imports?: any[];
}
export const appConfig: applicationConfig = {

  providers: [provideRouter(routes)]
};
