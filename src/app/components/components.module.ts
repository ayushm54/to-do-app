import { NgModule } from '@angular/core';
import { ListGroupComponent } from './list-group/list-group.component';
import { CommonModule } from '@angular/common';
import { EditTasksComponent } from './edit-tasks/edit-tasks.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ListGroupComponent, EditTasksComponent],
    exports: [ListGroupComponent, EditTasksComponent],
    imports: [CommonModule, FormsModule]
})

export class ComponentsModule { }
