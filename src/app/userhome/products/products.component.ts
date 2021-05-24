import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormBuilder, Validators }  from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { Observable, Subject,Observer } from 'rxjs'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   
    public currentDisplay:any="All";
    public searchForm:FormGroup
    public tempdata:any=[];
    public currentUser:any;
    public currentDatabaseData:any;
    public all:any=[];
    public electronicsData:any=[];
    public searchData:any=[];
    public clothingData:any=[];
    public srchInput:any;
    public chosenmode:any;
    public allUsers:any=[];
    public currentId:any;
    public numberofProductsInCart:any;
    public badgeValue:any;



  constructor(private router:Router, private http:HttpClient,private formbuilder:FormBuilder,private activatedRoute:ActivatedRoute) { 

    this.searchForm=this.formbuilder.group({

      search:['']
    
  
    })
  }

  ngOnInit(): void {

    this.updatebadge()
      this.http.get("http://localhost:3000/products").subscribe((data)=>
      {
            this.currentDatabaseData=data;
            
           for(var i=0;i<this.currentDatabaseData.length;i++)
           {
             this.all.push(this.currentDatabaseData[i]);
             if(this.currentDatabaseData[i].type=="eletronics")
             {
               this.electronicsData.push(this.currentDatabaseData[i])
             }
             if(this.currentDatabaseData[i].type=="clothing")
             {
               this.clothingData.push(this.currentDatabaseData[i])
             }
           }

      })
    console.log(this.clothingData,"line 43");
    console.log(this.electronicsData,"line44");
   
    this.http.get("http://localhost:3000/users").subscribe((data)=>
    {
        this.allUsers=data;
    });


    for(var i=0;i<this.allUsers.length;i++)
    {
       if(this.currentUser==this.allUsers[i].username)
       {

         this.tempdata=this.allUsers[i]
         this.currentId=this.allUsers[i].id


       }
    }

   

    this.activatedRoute.params.subscribe((data)=>
    {
           
           this.currentUser=data.id;
           console.log(this.currentUser)
           
          
     })
   


    
  }
  
    


  searching()
  { 
    console.log(this.srchInput,"Line 56");
    
   this.currentDisplay="searchResults"
  }


  

  modo(){
      switch(this.chosenmode) {
        case "mod1":
  
        if(this.currentDisplay=="All")
        {
          this.all.sort(( a:any,b:any)=> a.Price-b.Price)
        }
        else if(this.currentDisplay=="electronics")
        {
          this.electronicsData.sort(( a:any,b:any)=> a.Price-b.Price)
        }
        else if(this.currentDisplay=="clothing")
        {
          this.clothingData.sort(( a:any,b:any)=> a.Price-b.Price)
        }
  
  
        
          
           break;
        case "mod2":
      
          if(this.currentDisplay=="All")
          {
            this.all.sort(( a:any,b:any)=> b.Price-a.Price)
          }
          else if(this.currentDisplay=="electronics")
          {
            this.electronicsData.sort(( a:any,b:any)=> b.Price-a.Price)
          }
          else if(this.currentDisplay=="clothing")
          {
            this.clothingData.sort(( a:any,b:any)=> b.Price-a.Price)
          }
         
           break;
  
          
      
      }
    }

  
    

    addingToCart(id:any)
    {
      
      
      for(var i=0;i<this.allUsers.length;i++)
      {
         if(this.currentUser==this.allUsers[i].username)
         {

           this.tempdata=this.allUsers[i]
           this.currentId=this.allUsers[i].id


         }
      }


      for(var j=0;j<this.tempdata.cart.length;j++)
      {
           if(this.tempdata.cart[j]==id)
           {
             alert("Already in Cart")
              return;
           }
        

      }
    
      
      this.tempdata.cart.push(id);
      const body=this.tempdata;

     this.http.put("http://localhost:3000/users/"+`${this.currentId}`,body).subscribe((data)=>
     {
       console.log(data,"line 160");
       this.tempdata=data;
       this.numberofProductsInCart=this.tempdata.cart.length;
     })

   
    
    }

    displayElectronics()
    {
      this.currentDisplay="electronics"
    }
    displayAll()
    {
      this.currentDisplay="All"
    }
    
    displayCloths()
    {
      this.currentDisplay="clothing"
    }

   travelToCheckout()
   {
     console.log(this.currentUser,"line 155");
    this.router.navigate(['login/userhome/products/checkout/'+`${this.currentUser}`])
      
   }

   updatebadge()
   {
    this.http.get("http://localhost:3000/users").subscribe((data)=>
    {
        this.allUsers=data;
        for(var i=0;i<this.allUsers.length;i++)
    {
       if(this.currentUser==this.allUsers[i].username)
       {

         this.tempdata=this.allUsers[i]
         this.currentId=this.allUsers[i].id

         this.numberofProductsInCart=this.tempdata.cart.length;
         console.log(this.numberofProductsInCart,"line,239");


       }
    }
    
  

    });

   }


   logout()
   {
     localStorage.removeItem("ShoppingUserId");
     this.router.navigateByUrl('login');
   }
}
