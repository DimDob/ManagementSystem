import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSalariesComponentComponent } from './main-salaries-component.component';

describe('MainSalariesComponentComponent', () => {
  let component: MainSalariesComponentComponent;
  let fixture: ComponentFixture<MainSalariesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSalariesComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSalariesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
