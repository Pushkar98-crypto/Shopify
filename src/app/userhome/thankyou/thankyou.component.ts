import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { SendService } from '../../sendservice/send.service'
import {FormGroup, FormBuilder, Validators }  from '@angular/forms';

import emailjs, { EmailJSResponseStatus } from 'emailjs-com';



import{ init } from 'emailjs-com';

init("user_WsVVvsm5Wkti0AH34jFTG");
 
@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  public currentUser :any;
  public allUsers:any;
  public currentUserData: any;
  public currentId:any;
  public sendmail:any
  public finalmessage:any;
  public mailForm:FormGroup;
  constructor(private activatedRoute:ActivatedRoute,private formbuilder:FormBuilder, private http:HttpClient,private sendservice:SendService) { 

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
      
    // console.log(this.currentCartData,"line 47");

   
    });




    this.sendservice.collect.subscribe((data)=>
    {
      this.finalmessage=data;
      this.finalmessage=JSON.stringify(this.finalmessage)
      
    })

  
   this.mailForm.value.message=this.finalmessage;
    this.activatedRoute.params.subscribe((data)=>
    {
           
           this.currentUser=data.id;
           console.log(this.currentUser)
           
          
     })

      
  }

  send()
  {
    if(this.finalmessage.length>10)
    {
     const ap:any=document.getElementById("id1")
       ap.click()

    }
    else
    {
      alert("NO data in cart")
    }
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
}

