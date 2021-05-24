import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainhomeComponent } from './mainhome/mainhome.component';
import { AppregisterComponent } from './appregister/appregister.component';
import { ApploginComponent } from './applogin/applogin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
 


@NgModule({
  declarations: [
    MainhomeComponent,
    AppregisterComponent,
    ApploginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class ApphomeModule { }
