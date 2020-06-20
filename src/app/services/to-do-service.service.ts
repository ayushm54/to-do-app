import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


export interface TaskList{
  listName: string;
  listItems: Array<TaskItem>;
}

export interface TaskItem{
  name: string;
  completed: boolean;
  createdDate: Date;
}

const DATA_KEY = 'ALL_TO_DO_LIST_DATA';

@Injectable({
  providedIn: 'root'
})
export class ToDoServiceService {

  itemForEdit;
  constructor(public storage: Storage) { }

  setItemForEdit(item) {
    this.itemForEdit = item;
  }

  getTaskList() {
    return this.getListFromStorage();
  }

  removeOldTasks() {
    return this.storage.get(DATA_KEY).then().then(allTasks => {
      if (!allTasks || allTasks == null) {
        return null;
      }
      const curDate = new Date();
      for (const list of allTasks) {
        const tasksToKeep: TaskItem[] = [];
        for (const task of list.listItems) {
          const diffDateInDays = (Math.abs(task.createdDate.getTime() - curDate.getTime())) / (1000 * 36000 * 24);
          console.log('diffDateInDays ', diffDateInDays);
          if (diffDateInDays < 3 && task.completed) {
            tasksToKeep.push(task);
          }
          list.listItems = tasksToKeep;
        }
      }
      return this.storage.set(DATA_KEY, allTasks);
    });
  }

  getTaskItemToEdit() {
    return this.itemForEdit;
  }

  saveListOnStorage(listToSave): Promise<any> {
    return this.storage.get(DATA_KEY).then(list => {
      if (list && list != null) {
        list.push(listToSave);
        return this.storage.set(DATA_KEY, list);
      } else {
        return this.storage.set(DATA_KEY, [listToSave]);
      }
    });
  }

  getListFromStorage(): Promise<TaskList> {
   return this.storage.get(DATA_KEY);
  }

  deleteList(item): Promise<TaskList>{
    return this.storage.get(DATA_KEY).then((list) => {
      if (!list && list == null) {
        return null;
      }
      const dataToKeep: TaskList[] = [];
      for (const data of list) {
        console.log('data ', data);
        if (data.listName && data.listName != item.listName) {
          console.log('inside If');
          dataToKeep.push(data);
        }
      }
      return this.storage.set(DATA_KEY, dataToKeep);
    });
  }

  addTaskToList(newTaskToAdd) {
    const editListName = this.getTaskItemToEdit().listName;
    return this.storage.get(DATA_KEY).then((allList) => {
      if (!allList && allList == null) {
        return null;
      }
      for (const list of allList) {
        if (list.listName && list.listName == editListName) {
          list.listItems.push(newTaskToAdd);
          this.itemForEdit = list;
        }
      }
      return this.storage.set(DATA_KEY, allList);
    });
  }

  markTaskComplete(tasks) {
    const editListName = this.getTaskItemToEdit().listName;
    return this.storage.get(DATA_KEY).then((allList) => {
      if (!allList && allList == null) {
        return null;
      }
      for (const list of allList) {
        if (list.listName && list.listName == editListName) {
          list.listItems = tasks;
        }
      }
      return this.storage.set(DATA_KEY, allList);
    });
  }
}
