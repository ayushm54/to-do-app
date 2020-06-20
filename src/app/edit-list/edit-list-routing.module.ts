import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditListPage } from './edit-list.page';

const routes: Routes = [
  {
    path: '',
    component: EditListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditListPageRoutingModule {}
