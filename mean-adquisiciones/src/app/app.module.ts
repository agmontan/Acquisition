import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AppComponent } from './app.component';

import { AcquisitionComponent } from './components/acquisition/acquisition.component';
import { Observable } from 'rxjs';
import { CreateComponent } from './components/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    AcquisitionComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    routing,
    NgxFileDropModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
