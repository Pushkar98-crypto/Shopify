import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainhomeComponent } from './apphome/mainhome/mainhome.component'
import { ApploginComponent  } from './apphome/applogin/applogin.component';
import { AppregisterComponent } from './apphome/appregister/appregister.component';
import { UserShoppingHomeComponent } from './userhome/user-shopping-home/user-shopping-home.component'
import {ProductsComponent } from './userhome/products/products.component';
import {CheckoutComponent } from './userhome/checkout/checkout.component'
import { AuthguardGuard }  from './guard/authguard.guard'
import { ThankyouComponent} from './userhome/thankyou/thankyou.component'


const routes: Routes = [

{
  path:'',component:MainhomeComponent
},
{
  path:'login',component:ApploginComponent
},
{
  path:'register',component:AppregisterComponent
},
 {
   path:'login/userhome/:id',component:UserShoppingHomeComponent,canActivate:[AuthguardGuard]
 },
 {
   path:'login/userhome/products/:id',component:ProductsComponent,canActivate:[AuthguardGuard]
 },
 {
   path:'login/userhome/products/checkout/:id',component:CheckoutComponent,canActivate:[AuthguardGuard]
 },
 {
   path:'thankyou/:id',component:ThankyouComponent
 }
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
