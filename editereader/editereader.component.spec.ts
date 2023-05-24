import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditereaderComponent } from './editereader.component';

describe('EditereaderComponent', () => {
  let component: EditereaderComponent;
  let fixture: ComponentFixture<EditereaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditereaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditereaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
