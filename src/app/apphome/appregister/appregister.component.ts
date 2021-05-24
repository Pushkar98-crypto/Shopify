import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators }  from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';


import{ init } from 'emailjs-com';
init("user_WsVVvsm5Wkti0AH34jFTG");





@Component({
  selector: 'app-appregister',
  templateUrl: './appregister.component.html',
  styleUrls: ['./appregister.component.css']
})
export class AppregisterComponent implements OnInit {

  public regForm: FormGroup
  public issubmitted:Boolean=false;
  public mainUserUrl="http://localhost:3000/users";
  public random:any;

  constructor(private router: Router, private formbuilder:FormBuilder,private http:HttpClient) {

    this.regForm=this.formbuilder.group({
      name:['',Validators.required],
      message:[''],
      email:['',[Validators.required,Validators.email]],
      phoneNumber:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      address:['',Validators.required],
      pincode:['',Validators.required],
      age:[''],
      nationality:[''],
      username:['',Validators.required],
      password: ['',Validators.required],
      confirmPassword:['',Validators.required],
      verified:[false],
      cart:[[]],
      verificationCode:[''],
     

    


})
   }

  ngOnInit(): void {
    this.random=Math.floor(Math.random()*100000+1);
    
  }

 
  submit()
  {
    
    this.issubmitted=true;

     if(this.regForm.valid)
     { 
    
       this.regForm.value.verificationCode=this.random;
    this.http.post("http://localhost:3000/users",this.regForm.value).subscribe((data)=>
    {
      console.log(data,"Sumitted to data base");
      this.router.navigateByUrl('login');
    })

     }
    
    
   

    
   
  }


  public sendEmail(e:Event) {

  
     e.preventDefault();
    
    emailjs.sendForm('service_u8i96xb', 'template_xfy8xv7', e.target as HTMLFormElement, 'user_WsVVvsm5Wkti0AH34jFTG')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
     
      }, (error) => {
        console.log(error.text);
      });

 
       
  }

  get control()
  {
    return this.regForm.controls
  }

  

}
