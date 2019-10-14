import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardsComponent } from './boards/boards.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';
import { BoardsDetailsComponent } from './boards/boards-details/boards-details.component';
import { ListsComponent } from './lists/lists/lists.component';
import { CardsComponent } from './cards/cards/cards.component';
import { CardsDetailsComponent } from './cards/cards-details/cards-details.component';
import { AutofocusDirective } from './autofocus.directive';
import { EditableTitleComponent } from './shared/editable-title/editable-title.component';
import { ConfirmDeleteDialogComponent } from './shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { MaterialModule } from './material/material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    BoardsDetailsComponent,
    ListsComponent,
    CardsComponent,
    CardsDetailsComponent,
    AutofocusDirective,
    EditableTitleComponent,
    ConfirmDeleteDialogComponent,
    // FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CardsDetailsComponent,
    ConfirmDeleteDialogComponent
  ]
})
export class AppModule { }
