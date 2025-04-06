import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

// If appConfig exists, import it correctly
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
.catch((err) => console.error(err));
