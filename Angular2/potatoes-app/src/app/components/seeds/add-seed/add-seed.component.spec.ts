import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeedComponent } from './add-seed.component';

describe('AddSeedComponent', () => {
  let component: AddSeedComponent;
  let fixture: ComponentFixture<AddSeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
