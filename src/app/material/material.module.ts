import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    // MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule
  ]
})
export class MaterialModule { }
