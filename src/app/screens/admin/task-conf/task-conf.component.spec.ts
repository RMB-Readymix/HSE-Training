import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskConfComponent } from './task-conf.component';

describe('TaskConfComponent', () => {
  let component: TaskConfComponent;
  let fixture: ComponentFixture<TaskConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
