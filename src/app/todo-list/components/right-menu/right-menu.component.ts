import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar'; 
import { DropdownModule } from 'primeng/dropdown';
import { Select } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';



interface City {
  name: string;
  code: string;
}

@Component({
    selector: 'todo-list-right-menu',
    templateUrl: './right-menu.component.html',
    styleUrls: ['./right-menu.component.css'],
    standalone: true,
    imports: [Menu, ToastModule, InputTextModule, FloatLabel , CalendarModule, DropdownModule, Select, TagModule, CommonModule, ButtonModule]
})
export class RightMenuComponent implements OnInit {

  date: Date | undefined;

  cities: City[] | undefined;

    selectedCity: City | undefined;

    items: MenuItem[] | undefined;

    ngOnInit() {

      this.items = [
        {
          separator: true
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
            label: 'Subtasks',
            items: [
                {
                    label: 'Add New Subtag',
                    icon: 'pi pi-plus'
                },
                {
                    label: 'Subtask 1',
                },
                {
                  label: 'Subtask 2',
                },
                {
                  label: 'Subtask 3',
                }
                
            ]
        },

        {
          items: [
              {
                sublabel: 'Save Changes',
              }
              
          ]
      }
    ];

    this.cities = [
      { name: 'Category 1', code: 'NY' },
      { name: 'Category 2', code: 'RM' },
      { name: 'Category 3', code: 'LDN' }
  ];

    }

}