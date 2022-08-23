import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndInfoComponent } from './ind-info.component';

describe('IndInfoComponent', () => {
  let component: IndInfoComponent;
  let fixture: ComponentFixture<IndInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
