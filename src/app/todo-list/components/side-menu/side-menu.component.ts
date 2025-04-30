import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { NgIf } from '@angular/common';

@Component({
    selector: 'todo-list-side-menu',
    styleUrls: ['./side-menu.component.css'],
    templateUrl: './side-menu.component.html',
    standalone: true,
    imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, NgIf]
})
export class SideMenuComponent implements OnInit {
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
                        icon: 'pi pi-stopwatch'
                    },
                    {
                        label: 'In progress',
                        icon: 'pi pi-play-circle'
                    },
                    {
                      label: 'Paused',
                      icon: 'pi pi-pause-circle'
                    },
                    {
                      label: 'Late',
                      icon: 'pi pi-undo'
                    },
                    {
                      label: 'Finished',
                      icon: 'pi pi-thumbs-up'
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
                        label: 'Tag 1',
                        icon: 'pi pi-cog'
                    },
                    {
                        label: 'Tag 2',
                        icon: 'pi pi-inbox',
                        badge: '2'
                    },
                    {
                        label: 'New Tag',
                        icon: 'pi pi-sign-out'
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
                      icon: 'pi pi-cog'
                  },
                  {
                      label: 'Sign Out',
                      icon: 'pi pi-inbox',
                      badge: '2'
                  }
              ]
          },
        ];
    }
}