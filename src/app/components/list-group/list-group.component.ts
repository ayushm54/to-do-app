import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ToDoServiceService } from '../../services/to-do-service.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListGroupComponent implements OnInit {

  @Input() public taskLists;
  @Output() loadTasks: EventEmitter<any> = new EventEmitter();

  constructor(private toDoService: ToDoServiceService,
              private router: Router,
              public alertController: AlertController,
              public toast: ToastController) {
  }

  ngOnInit() {
    this.loadTasks.emit();
  }

  editList(item) {
    this.toDoService.setItemForEdit(item);
    this.router.navigate(['edit-list']);
  }

  deleteList(item) {
    this.openDeleteAlert(item);
  }

  async openDeleteAlert(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-alert-class ',
      header: `${item.listName} would be deleted.`,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.deleteItemFromList(item);
        }
      }]
    });

    await alert.present();
  }

  deleteItemFromList(item) {
    this.toDoService.deleteList(item).then(result => {
      if (result !== null) {
        this.showToast(`${item.listName} deleted successfully.`);
        this.loadTasks.emit();
      }
    });
  }

  async showToast(text) {
    const myToast = await this.toast.create({
      message: text,
      duration: 2000
    });
    myToast.present();
  }

}
