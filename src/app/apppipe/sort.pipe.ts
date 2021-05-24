import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<any>, args:any): any {
    
    const sortField=args;
   return value.sort((a, b):any=>{
     if(a[sortField]<b[sortField])
     {
       return -1;
     }
     else if(a[sortField]>b[sortField])
     {
       return 1;
     }
     else
     {
       return 0;
     }
      
    });

     
  }

}
