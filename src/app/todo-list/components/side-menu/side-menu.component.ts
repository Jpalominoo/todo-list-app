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
                        command: (event) => {
                            console.log(event);
                            this.navigationService.gotoRoute(['/dashboard/tasks', 'non-started-tasks']);
                            
                        }
                    },
                    {
                        label: 'In progress',
                        icon: 'pi pi-play-circle',
                        command: (event) => {
                            this.navigationService.gotoRoute(['/dashboard/tasks', 'in-progress-tasks']);
                        }
                    },
                    {
                      label: 'Paused',
                      icon: 'pi pi-pause-circle',
                      command: (event) => {
                        this.navigationService.gotoRoute(['/dashboard/tasks', 'paused-tasks']);
                    }
                    },
                    {
                      label: 'Late',
                      icon: 'pi pi-undo',
                      command: (event) => {
                        this.navigationService.gotoRoute(['/dashboard/tasks', 'late-tasks']);
                        
                    }
                    },
                    {
                      label: 'Finished',
                      icon: 'pi pi-thumbs-up',
                      command: () => {
                        this.navigationService.gotoRoute(['/dashboard/tasks', 'finished-tasks']);
                    }
                    }
                ]
            },
            {
                label: 'Category',
                items: [
                    {
                        label: 'Category 1',
                        icon: 'pi pi-circle-fill' 
                    },
                    {
                        label: 'Category 2',
                        icon: 'pi pi-circle-fill',
                        badge: '2'
                    },
                    {
                        label: 'Category 3',
                        icon: 'pi pi-circle-fill'
                    },
                    {
                      label: 'Add New List',
                      icon: 'pi pi-circle-fill'
                    }
                ]
            },

          {
                label: 'Tags',
                items: [
                    {
                        tag: ' Tag 1', 
                    },

                    {
                        tag: ' Tag 2', 
                    },

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
                      
                  }
              ]
          },
        ];
    }
}