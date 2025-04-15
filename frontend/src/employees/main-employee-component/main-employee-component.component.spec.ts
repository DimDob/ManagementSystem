import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEmployeeComponentComponent } from './main-employee-component.component';

describe('MainEmployeeComponentComponent', () => {
  let component: MainEmployeeComponentComponent;
  let fixture: ComponentFixture<MainEmployeeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainEmployeeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainEmployeeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
