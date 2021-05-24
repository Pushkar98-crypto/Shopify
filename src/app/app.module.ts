import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApphomeModule} from './apphome/apphome.module';
import { HttpClientModule } from '@angular/common/http';
import { UserhomeModule } from './userhome/userhome.module';
import { AuthserviceService } from './auth/authservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';







@NgModule({
  declarations: [
    AppComponent,
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApphomeModule,
    FormsModule,
    HttpClientModule,
    UserhomeModule,
    BrowserAnimationsModule,

   
    
    
    
  ],
  providers: [AuthserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
