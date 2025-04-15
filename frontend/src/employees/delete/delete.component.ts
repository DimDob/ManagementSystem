import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { EditComponent } from '../edit/edit/edit.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'delete-employee',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule,MatInputModule, MatDialogModule, MatButtonModule, MatIconModule, MatCardModule, MatCardModule, MatIconModule, MatFormFieldModule, FormsModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent{

}
