import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditListPage } from './edit-list.page';

describe('EditListPage', () => {
  let component: EditListPage;
  let fixture: ComponentFixture<EditListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
