import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndTrainingComponent } from './ind-training.component';

describe('IndTrainingComponent', () => {
  let component: IndTrainingComponent;
  let fixture: ComponentFixture<IndTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
