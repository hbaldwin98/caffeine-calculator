import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCaffeineComponent } from './add-caffeine/add-caffeine.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NavComponent } from './nav/nav.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DrinkListComponent } from './drink-list/drink-list.component';
import { DrinkHomeComponent } from './drink-home/drink-home.component';
@NgModule({
  declarations: [AppComponent, HomeComponent, AddCaffeineComponent, NavComponent, DrinkListComponent, DrinkHomeComponent,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TimepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
