import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from'@angular/forms'
import { Router } from '@angular/router';
import { ApiServicesService } from '../services/api-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
   loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]] })

  constructor(private fb:FormBuilder,
              private api:ApiServicesService,
              private router:Router) { }

  ngOnInit(): void {
  }
  login(){
    var acno = this.loginForm.value.acno
    var pswd =this.loginForm.value.pswd   
    
    if(this.loginForm.valid)
    // asynchronous
    {
      this.api.login(acno,pswd).subscribe((result:any)=>{
        // store username in loacalstorage
        localStorage.setItem("uname",result.uname)
        // store username in token
        localStorage.setItem("token",result.token)
        // store currentacno
        localStorage.setItem("currentAcno",result.currentAcno)

      alert(result.message) 
      this.router.navigateByUrl('dashboard')       
      },
      (result:any)=>{
        alert(result.error.message)
      }
      )
    }

    else
   {
    alert('Invalid form...')
   }

   
  }
}
