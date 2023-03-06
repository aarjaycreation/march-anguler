import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './MyComponent/add/add.component';
import { ListComponent } from './MyComponent/list/list.component';
import { NavbarComponent } from './MyComponent/navbar/navbar.component';

import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// import filepond module
import { FilePondModule, registerPlugin } from 'ngx-filepond';

// import and register filepond file type validation plugin
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// registerPlugin(FilePondPluginFileValidateType);


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ListComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    FilePondModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
