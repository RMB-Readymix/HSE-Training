import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseConfComponent } from './course-conf.component';

describe('CourseConfComponent', () => {
  let component: CourseConfComponent;
  let fixture: ComponentFixture<CourseConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
