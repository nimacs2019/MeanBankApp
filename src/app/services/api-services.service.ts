import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const options = {
  headers :new HttpHeaders
}

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  constructor( private api:HttpClient) {}
    // 1.Login API asynchronous
    login(acno : any , pswd :any)
    {
      const body= {
        acno, 
        pswd
      }
      return this.api.post('http://localhost:3000/login',body)
    }

    // 2.Register api asynchronous
    register(acno : any , pswd :any, uname:any)
    {
      const body= {
        acno, 
        pswd,
        uname
      }
      return this.api.post('http://localhost:3000/register',body)
    } 

    // to insert token ina http header
    getToken()
    {
      // 1.get token from local storage
      const token = localStorage.getItem("token")
    
      // 2.create http header
      let headers = new HttpHeaders()

      // 3. to insert token inside header
      if(token)
      {
        headers=headers.append("access-token",token)
        // to achieve function overloading
        options.headers=headers
      }
      return options
    }

    // 3.deposite api asynchronous
    deposite(acno : any , pswd :any, amount:any)
    {
      const body= {
        acno, 
        pswd,
        amount
      }
      return this.api.post('http://localhost:3000/deposite',body,this.getToken())
    }

    //4. withdrawel api asynchronous
    withdraw(acno : any , pswd :any, amount:any)
    {
      const body= {
        acno, 
        pswd,
        amount
      }
      return this.api.post('http://localhost:3000/withdraw',body,this.getToken())
    }
    // 5.transaction
    transaction(acno:any)
    {
      return this.api.get('http://localhost:3000/transaction/'+acno,this.getToken())
    }

    // 6. delete api asynchronous
    deleteAcc(acno:any)
    {
      return this.api.delete('http://localhost:3000/deleteacno/'+acno,this.getToken())

    }
}
