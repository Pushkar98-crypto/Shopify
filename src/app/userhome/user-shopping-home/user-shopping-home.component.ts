import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-shopping-home',
  templateUrl: './user-shopping-home.component.html',
  styleUrls: ['./user-shopping-home.component.css']
})
export class UserShoppingHomeComponent implements OnInit {


  public currentUser:any;
  
  constructor(private router:Router,private activatedRoute:ActivatedRoute) {
    
   }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((data)=>
    {
           
           this.currentUser=data.id;
           console.log(this.currentUser)
           
          
     })
   
  }

 
   // console.log(this.currTempData,"line 31");
   
  logout()
  {
    localStorage.removeItem("ShoppingUserId");
    this.router.navigateByUrl('login');
  }

  travelToProducts()
  {
    
    this.router.navigate(['login/userhome/products/'+`${this.currentUser}`])
  }

}
