import { Routes } from '@angular/router';

export const routes: Routes = [

    /* Arreglar paths para no poner el .then */

    {
    path: 'dashboard',
    loadComponent: () => import('./todo-list/pages/dashboard-page/dashboard-page.component'),

    children: [

        {
            path: 'tasks/:id',
            loadComponent: () => import('./todo-list/pages/tasks-page/tasks-page.component'),
        },


        {
            path: '**',
            redirectTo: 'tasks',
        }

    ],
    
    },
    

    {

    path: '**',
    redirectTo: 'dashboard',

    }


];
