import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditListPageRoutingModule } from './edit-list-routing.module';

import { EditListPage } from './edit-list.page';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditListPage]
})
export class EditListPageModule {}
