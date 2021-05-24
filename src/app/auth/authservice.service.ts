import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ThrowStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
public tempData:any;

  loginCheck(username: any, password: any) :any {
    for(let i=0;i<this.tempData.length;i++)
    {
      console.log(this.tempData[i].username)
      console.log(username);
      if(username==this.tempData[i].username  && password==this.tempData[i].password)
        {
          if(this.tempData[i].verified)
          {
           localStorage.setItem('ShoppingUserId',"allowed");
           return true;  
          }
          else 
          {
            alert("Please verify yourself")
          }

        }

        
    }
  }

  constructor( private http:HttpClient) {
    this.http.get("http://localhost:3000/users").subscribe((data)=>{console.log(data);
    this.tempData=data;
   });

   }
}
