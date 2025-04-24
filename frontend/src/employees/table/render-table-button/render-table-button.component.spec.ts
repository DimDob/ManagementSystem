import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderTableButtonComponent } from './render-table-button.component';

describe('RenderTableButtonComponent', () => {
  let component: RenderTableButtonComponent;
  let fixture: ComponentFixture<RenderTableButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderTableButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderTableButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
