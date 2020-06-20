import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ToDoServiceService, TaskItem } from '../../services/to-do-service.service';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html',
  styleUrls: ['./edit-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTasksComponent implements OnInit {

  @Input() tasks: any;
  @Output() updateTaskForEdit: EventEmitter<any> = new EventEmitter();

  constructor(public alertController: AlertController,
              public toast: ToastController,
              public toDoService: ToDoServiceService) { }

  ngOnInit() {
  }

  addTask() {
    this.presentAddAlert();
  }

  addNewTaskToList(newTaskToAdd) {
    this.toDoService.addTaskToList(newTaskToAdd).then(result => {
      if (result != null) {
        this.showToast('Task added successfully!');
        this.updateTaskForEdit.emit();
      }
    });
  }

  markTaskComplete(event, task) {
      this.presentMarktaskCompleteAlert(task);
  }

  markCompleteAndSave(task) {
    for (const item of this.tasks) {
      if (item.name == task.name && !task.completed) {
        item.completed = true;
      }
    }
    this.toDoService.markTaskComplete(this.tasks).then(() => {
      this.showToast('Task Completed');
      this.updateTaskForEdit.emit();
    });
  }

  async showToast(text) {
    const myToast = await this.toast.create({
      message: text,
      duration: 2000
    });
    myToast.present();
  }

  async presentAddAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-alert-class ',
      header: 'Add List',
      animated: true,
      backdropDismiss: false,
      inputs: [
        {
          name: 'taskName',
          type: 'text',
          placeholder: 'Enter Task name'
        }
      ],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary'
      },
        {
          text: 'Add',
          handler: (data) => {
            if (data.taskName.trim() === '') {
              this.failedAlert('List Name is required!');
            }
            else {
              const newTaskToAdd = <TaskItem>{};
              newTaskToAdd.completed = false;
              newTaskToAdd.name = data.taskName;
              newTaskToAdd.createdDate = new Date();

              console.log("newTaskToAdd ", newTaskToAdd);

              this.addNewTaskToList(newTaskToAdd);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async presentMarktaskCompleteAlert(task) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-alert-class ',
      header: `Are you sure ${task.name} is completed?`,
      animated: true,
      backdropDismiss: false,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary'
      },
        {
          text: 'Yes',
          handler: () => {
            this.markCompleteAndSave(task);
          }
        }
      ]
    });
    await alert.present();
  }

  async failedAlert(text) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-alert-class ',
      header: 'Failed',
      subHeader: text,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.presentAddAlert();
        }
      }]
    });

    await alert.present();
  }
}
