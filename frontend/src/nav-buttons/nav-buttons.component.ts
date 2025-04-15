import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';

/**
 * @title Basic buttons
 */
@Component({
  selector: 'overview-button',
  templateUrl: 'nav-buttons.component.html',
  styleUrl: 'nav-buttons.component.css',
  imports: [RouterModule, MatButtonModule, MatDividerModule, MatIconModule],
})
export class ButtonOverviewExample {}
