import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeedComponent } from './edit-seed.component';

describe('EditSeedComponent', () => {
  let component: EditSeedComponent;
  let fixture: ComponentFixture<EditSeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
