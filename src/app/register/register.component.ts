import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServicesService } from '../services/api-services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm=this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]] ,
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]] 
  })

  constructor(private fb:FormBuilder,
              private api:ApiServicesService,
              private router:Router) { }

  ngOnInit(): void {
  }
  register(){
    var acno = this.RegisterForm.value.acno
    var pswd =this.RegisterForm.value.pswd   
    var uname =this.RegisterForm.value.uname   

    
    if(this.RegisterForm.valid)
    // asynchronous
    {
      this.api.register(acno,pswd,uname).subscribe((result:any)=>{
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
