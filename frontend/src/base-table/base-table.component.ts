import { ChangeDetectorRef, Component, inject } from '@angular/core';

@Component({
  selector: 'app-base',
  imports: [],
  templateUrl: '../base-table/base-table.component.html',
  styleUrl: '../base-table/base-table.component.css'
})
export class BaseTableComponent {

  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.cdr.detectChanges();
  }
}
