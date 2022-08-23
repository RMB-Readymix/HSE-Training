import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpTrainingComponent } from './grp-training.component';

describe('GrpTrainingComponent', () => {
  let component: GrpTrainingComponent;
  let fixture: ComponentFixture<GrpTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrpTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
