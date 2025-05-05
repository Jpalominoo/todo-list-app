import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule, NgIf } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'todo-list-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.css'],
    standalone: true,
    imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, NgIf, TagModule, CommonModule]
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