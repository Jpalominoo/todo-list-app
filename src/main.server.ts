import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config.server'; // Importa 'config'
import { AppComponent } from './app/app.component';

const bootstrap = () => bootstrapApplication(AppComponent, appConfig);

export default bootstrap;