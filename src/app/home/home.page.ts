import { Component } from '@angular/core';
import { ToDoServiceService, TaskList } from '../services/to-do-service.service';
import { AlertController, Platform, ToastController, NavController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasksList;
  constructor(private toDoService: ToDoServiceService,
              public alertController: AlertController,
              public platform: Platform,
              public toast: ToastController,
              public navController: NavController,
              public _location: Location) {
    this.platform.ready().then(() => {
      this.removeOldTasks();
    });

    this.platform.backButton.subscribeWithPriority(666666, () => {
      if (this._location.isCurrentPathEqualTo('/home') || this._location.isCurrentPathEqualTo('')) {
        if (window.confirm('Do you want to exit the application?')) {
          navigator["app"].exitApp();
        }
        else {
          // Navigate to back page
          this._location.back();
        }
      }
    });
  }

  ionViewWillEnter() {
    console.log('pressedBAck');
    this.getTaskList();
  }

  getTaskList() {
    this.toDoService.getListFromStorage().then((list) => {
      this.tasksList = list;
    });
  }

  removeOldTasks() {
    this.toDoService.removeOldTasks().then((list) => {
      this.tasksList = list;
    });
  }

  addNewList() {
    this.presentAddAlert();
  }

  addNewItemToList(itemToAdd) {
    this.toDoService.saveListOnStorage(itemToAdd).then(item => {
      this.showToast('List added successfully!');
      this.getTaskList();
    });
  }

  async showToast(text) {
    const myToast = await this.toast.create({
      message: text,
      duration: 2000
    });
    myToast.present();
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

  async presentAddAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-alert-class ',
      header: 'Add List',
      animated: true,
      backdropDismiss: false,
      inputs: [
        {
          name: 'listName',
          type: 'text',
          placeholder: 'Enter list name'
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
            if (data.listName.trim() === '') {
              this.failedAlert('List Name is required!');
            }
            else {
              const newListToAdd = <TaskList>{};
              newListToAdd.listItems = [];
              newListToAdd.listName = data.listName;

              this.addNewItemToList(newListToAdd);
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
