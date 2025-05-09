import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule, NgIf } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { NavigationService } from '../../services/navigation.service';


@Component({
    selector: 'todo-list-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.css'],
    providers: [NavigationService],
    standalone: true,
    imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, NgIf, TagModule, CommonModule]
})
export class SideMenuComponent implements OnInit {

    constructor(private navigationService: NavigationService) { }


    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                separator: true
            },
            {
                label: 'Tasks',
                items: [
                    {
                        label: 'Non started',
                        icon: 'pi pi-stopwatch',
                        badge: '2',
                        command: (event) => {
                            console.log(event);
                            this.navigationService.gotoRoute(['/dashboard/tasks', 'non-started-tasks']);
                            
                        }
                    },
                    {
                        label: 'In progress',
                        icon: 'pi pi-play-circle',
                        badge: '2',
                        command: (event) => {
                            this.navigationService.gotoRoute(['/dashboard/tasks', 'in-progress-tasks']);
                        }
                    },
                    {
                      label: 'Paused',
                      icon: 'pi pi-pause-circle',
                      badge: '2',
                      command: (event) => {
                        this.navigationService.gotoRoute(['/dashboard/tasks', 'paused-tasks']);
                    }
                    },
                    {
                      label: 'Late',
                      icon: 'pi pi-undo',
                      badge: '2',
                      command: (event) => {
                        this.navigationService.gotoRoute(['/dashboard/tasks', 'late-tasks']);
                        
                    }
                    },
                    {
                      label: 'Finished',
                      icon: 'pi pi-thumbs-up',
                      badge: '2',
                      command: (event) => {
                        this.navigationService.gotoRoute(['/dashboard/tasks', 'finished-tasks']);
                    }
                    }
                ]
            },
            {
                label: 'Category',
                items: [
                    {
                        label: 'Add New Category',
                        icon: 'pi pi-circle-fill' 
                    },
                ]
            },

          {
                label: 'Tags',
                items: [

                    {
                        tag: ' + Add Tag', 
                    }
                ]
            },

            {
                separator: true
            },

            {
              items: [
                  {
                      label: 'Calendar',
                      icon: 'pi pi-cog',
                      badge: '2'
                  },
                  {
                      label: 'Sign Out',
                      icon: 'pi pi-inbox',
                      command: (event) => {
                        this.navigationService.gotoLogin();
                    }


                      
                  }
              ]
          },
        ];
    }
}