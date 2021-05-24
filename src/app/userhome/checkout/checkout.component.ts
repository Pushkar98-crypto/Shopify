import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {FormGroup, FormBuilder, Validators }  from '@angular/forms';
import { SendService } from '../../sendservice/send.service'




import emailjs, { EmailJSResponseStatus } from 'emailjs-com';



import{ init } from 'emailjs-com';

init("user_WsVVvsm5Wkti0AH34jFTG");

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public allUsers:any;
  public currentUser:any;
  public currentUserData:any;
  public currentCartData:any;
  public allProductsData:any=[];
  public currentProductsData:any=[];
  public eachprice:any;
  public totalPrice:number=0;
  public tempdata:any;
  public currentId:any;
  public finalProducts:any=[];
  public sendProducts:any;
  public isTotalVisible:boolean=false;
  
  public checkFlag:boolean=false;
  public unitForm:FormGroup;
  public mailForm:FormGroup;
  public finalSendMessage:string="";
  public sendmail:any;
  


  constructor( private sendservice:SendService, private http:HttpClient,private activatedRoute:ActivatedRoute,private formbuilder:FormBuilder,private router:Router) {

    this.unitForm=this.formbuilder.group({

      unit:['']
    
  
    })
    this.mailForm=this.formbuilder.group({

      message:[''],
      email:[''],
    
  
    })
   }

  ngOnInit(): void {

    
   


  this.http.get("http://localhost:3000/users").subscribe((data)=>
    {
        this.allUsers=data;

        for(var i=0;i<this.allUsers.length;i++)
        {
          if(this.currentUser==this.allUsers[i].username)
          {
               this.currentUserData=this.allUsers[i];
              // console.log(this.currentUserData,"line 42");
              this.currentId=this.currentUserData.id;
              this.sendmail=this.currentUserData.email;

          }
        }
        this.currentCartData=this.currentUserData.cart;
    // console.log(this.currentCartData,"line 47");

    this.http.get("http://localhost:3000/products").subscribe((data)=>
    {
         this.allProductsData=data;
         for(var j=0;j<this.currentCartData.length;j++)
         {
           for(var k=0;k<this.allProductsData.length;k++)
           {
             if(this.currentCartData[j]==this.allProductsData[k].id)
             {
               this.currentProductsData.push(this.allProductsData[k]);
    
             }
           }
         }
         console.log(this.allProductsData,"line 55");
  

   
    });

    });

   

    
        
   

    this.activatedRoute.params.subscribe((data)=>
    {
           
           this.currentUser=data.id;
           console.log(this.currentUser)
           
          
     })
  this.finalSendMessage=this.mailForm.value.message;
     
    
  }


  deleting(id:any)
  {
     this.tempdata=this.currentUserData;
     this.tempdata.cart.forEach((element:any,index:any)=>{
      if(element==id) this.tempdata.cart.splice(index,1);
   });

     console.log(this.tempdata.cart,"line 91");
  
   this.http.put("http://localhost:3000/users/"+`${this.currentId}`,this.tempdata).subscribe((data)=>
    {
      
      this.tempdata=data;
      this.currentCartData=this.tempdata.cart;
      this.currentProductsData=[];
      for(var j=0;j<this.currentCartData.length;j++)
      {
        for(var k=0;k<this.allProductsData.length;k++)
        {
          if(this.currentCartData[j]==this.allProductsData[k].id)
          {
            this.currentProductsData.push(this.allProductsData[k]);
  
          }
        }
      }
    })

    

  }
  // showUpdatedPrice(val:any)
  // {
  //    console.log(val,"line,121")
     
  // }

  valuechange(quantity:any,eachdata:any) {
     
     let price=eachdata.Price
     let id=eachdata.id
     let name=eachdata.Productname;
     

    let newdata:any;
    let newprice=quantity*price;
    for(var i=0;i<this.currentProductsData.length;i++)
    {
      if(this.currentProductsData[i].id==id)
      {
       newdata=this.currentProductsData[i];
      newdata.dynamicprice=newprice;
      this.currentProductsData[i]=newdata;
      }
    }
    for(var i=0;i<this.finalProducts.length;i++)
     {  
       if(this.finalProducts[i].Productname==name)
       {
         this.checkFlag=true;
        }
       
     }
     if (!this.checkFlag)
     {
      eachdata.dynamicprice=newprice
      eachdata.quantity=quantity;
     
     this.finalProducts.push(eachdata);
     console.log(this.finalProducts,"line 149");
       this.checkFlag=false
        }
        else{
          for(var i=0;i<this.finalProducts.length;i++)
          {  
            if(this.finalProducts[i].Productname==eachdata.Productname)
            {
              this.finalProducts[i].dynamicprice=newprice;
              this.finalProducts[i].quantity=quantity;
             }
        }
        console.log(this.finalProducts,"line 175");
        this.checkFlag=false;
      }
    
    
    
     

}

checkingout()
{
  this.totalPrice=0;
  console.log(this.finalProducts,"li")
  this.sendProducts=this.currentProductsData;

  for(var i=0;i<this.sendProducts.length;i++)
  {
    for(var j=0;j<this.finalProducts.length;j++)
    {
       if (this.sendProducts[i].id==this.finalProducts[j].id)
       {
         this.sendProducts[i].quantity=this.finalProducts[j].quantity;
         this.sendProducts[i].dynamicprice=this.finalProducts[j].dynamicprice;

       }
       
    }
  }
  for(var i=0;i<this.sendProducts.length;i++)
  {
    if(!this.sendProducts[i].quantity)
    {
      this.sendProducts[i].quantity=1;
    }
  
    this.totalPrice=this.totalPrice+this.sendProducts[i].dynamicprice;
    this.isTotalVisible=true;

     
  
   
   
  }
 

  for(var i=0;i<this.sendProducts.length;i++)
  {

  var mystring :string=  " "
  mystring+="Product :" +this.sendProducts[i].Productname;
  mystring+="Price: "+  this.sendProducts[i].dynamicprice;
  mystring+="Unit:"+  this.sendProducts[i].quantity;

  
  
  this.finalSendMessage+=mystring
 
  }

 

  this.finalSendMessage+="Total:" + this.totalPrice;

  this.mailForm.value.message=this.finalSendMessage
 
  console.log(this.mailForm.value.message,"line 272")
   
 this.sendDetails()

}


sendDetails()
{

console.log(this.mailForm.value.message,"line 282");
  
  //  const ap:any=document.getElementById("id1")
  //  ap.click()
}
public sendEmail(e:Event) {
  
  console.log(e.target,"Line 119");
  e.preventDefault();
  
  emailjs.sendForm('service_u8i96xb', 'template_xfy8xv7', e.target as HTMLFormElement, 'user_WsVVvsm5Wkti0AH34jFTG')
    .then((result: EmailJSResponseStatus) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });

  
}
logout()
{
  localStorage.removeItem("ShoppingUserId");
  this.router.navigateByUrl('login');
}

buy()
{
  
  this.sendservice.send.next(this.finalSendMessage);
  this.router.navigate(['thankyou/'+`${this.currentUser}`])

}
 
}
  

