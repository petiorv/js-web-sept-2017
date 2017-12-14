import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSeedComponent } from './detail-seed.component';

describe('DetailSeedComponent', () => {
  let component: DetailSeedComponent;
  let fixture: ComponentFixture<DetailSeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
