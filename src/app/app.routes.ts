import { Routes } from '@angular/router';

export const routes: Routes = [

    /* Arreglar paths para no poner el .then */

    {
    path: 'dashboard',
    loadComponent: () => import('./todo-list/pages/dashboard-page/dashboard-page.component').then(c => c.DashboardPageComponent)

    
    },
    

    {

    path: '**',
    redirectTo: 'dashboard',

    }


];
