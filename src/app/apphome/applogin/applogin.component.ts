import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators }  from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthserviceService } from '../../auth/authservice.service'



@Component({
  selector: 'app-applogin',
  templateUrl: './applogin.component.html',
  styleUrls: ['./applogin.component.css']
})
export class ApploginComponent implements OnInit {

  public logForm:FormGroup;
  public verifyForm:FormGroup;
  public checkFlag:boolean=false;
  public issubmitted:boolean = false;
  public infodata:any;
  public currentID:any;
  public currentInfodata:any;
  public verifyToggle:boolean=false;
  public code:any;

  constructor(private router: Router, private formbuilder:FormBuilder,private http:HttpClient ,private authservice:AuthserviceService) { 


    this.logForm=this.formbuilder.group({

      username:['',Validators.required],
      password: ['',Validators.required]
  
    })

    this.verifyForm=this.formbuilder.group({

      code:['']
 
   })
  }

  ngOnInit(): void {
    this.http.get("http://localhost:3000/users").subscribe(data=>{
    this.infodata=data;
     })
     
  }


  get control()
  {
    return this.logForm.controls
  }


  login()
  {
    this.issubmitted=true;


   if(this.authservice.loginCheck(this.logForm.value.username,this.logForm.value.password))
   {
    this.router.navigate(['login/userhome/'+`${this.logForm.value.username}`])
   }
   else{
     this.router.navigateByUrl('login')
   }
   this.issubmitted=false;
  }

 
  

  toggle()
  {
    if(this.verifyToggle)
    {
       this.verifyToggle=false
    }
    else
    {
      this.verifyToggle=true;
    }
  }

  verifying()
  {

    if(this.logForm.value.username || this.logForm.value.password)
     {

      for(var i=0;i<this.infodata.length;i++)
      {
        if(this.infodata[i].username==this.logForm.value.username)
        {
          this.currentInfodata=this.infodata[i];
         
          this.currentID=this.infodata[i].id;
          this.checkFlag=true;
        }
      }    
      if(this.checkFlag)
      {
      
      if(!this.currentInfodata.verified)
      {
        if(this.currentInfodata.verificationCode==this.code)
        {
          alert("Verified");
          this.http.patch("http://localhost:3000/users/"+`${this.currentID}`,{
          verified:true
    
          }).subscribe((getfresh)=>
          {
            console.log(getfresh);
          })
        }
        else
        {
          alert("wrong code");
        }
      }
      else
      {
        alert("You are already verified")
      }
    }
    else
    {
      alert("You are not registered Please Fill Registration Form")
    }
    }
    else
    {
      alert("Credentials are empty!!")
    }

  }

}
