import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendService {

  constructor() { }

send=new BehaviorSubject({});
collect=this.send.asObservable();
}
