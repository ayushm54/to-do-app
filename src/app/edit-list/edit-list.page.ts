import { Component, OnInit } from '@angular/core';
import { ToDoServiceService } from '../services/to-do-service.service';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.page.html',
  styleUrls: ['./edit-list.page.scss'],
})
export class EditListPage implements OnInit {

  itemToEdit;
  completedTaskCount = 0;

  constructor(private toDoService: ToDoServiceService,
              public platform: Platform,
              public _location: Location) {
    this.platform.backButton.subscribeWithPriority(666666, () => {
          // Navigate to back page
          this._location.back();
    });
  }

  ngOnInit() {
    this.updateTaskForEdit();
    const listItems = this.itemToEdit.listItems;
    listItems.forEach(element => {
      if (element.completed) {
        this.completedTaskCount++;
      }
    });
  }

  updateTaskForEdit() {
    this.itemToEdit = this.toDoService.getTaskItemToEdit();
  }

}
