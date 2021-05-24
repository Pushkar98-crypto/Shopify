import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserShoppingHomeComponent } from './user-shopping-home/user-shopping-home.component';
import { ProductsComponent } from './products/products.component';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FilterPipe } from '../apppipe/filter.pipe';
import { SortPipe } from '../apppipe/sort.pipe';
import { CheckoutComponent } from './checkout/checkout.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';






@NgModule({
  declarations: [
    UserShoppingHomeComponent,
    ProductsComponent,
    FilterPipe,
    SortPipe,
    CheckoutComponent,
    
   
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatIconModule

   
  ] 
})
export class UserhomeModule { }
