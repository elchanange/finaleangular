import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatButtonModule, MatToolbarModule, MatCardModule, MatChipsModule, MatIconModule, PerfectScrollbarModule, MatProgressSpinnerModule, MatDialogModule, FormsModule, BrowserAnimationsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatSelectModule
  ],
  exports: [
    MatButtonModule, MatToolbarModule, MatCardModule, MatChipsModule, MatIconModule, PerfectScrollbarModule, MatProgressSpinnerModule, MatDialogModule, FormsModule, BrowserAnimationsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatSelectModule
  ]
})
export class MaterialModule {
}
