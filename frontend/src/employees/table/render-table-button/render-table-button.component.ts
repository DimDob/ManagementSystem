import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';

@Component({
  selector: 'app-render-table-button',
  imports: [RouterModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './render-table-button.component.html',
  styleUrl: './render-table-button.component.css'
})
export class RenderTableButtonComponent extends BaseTableComponent implements OnInit {}
