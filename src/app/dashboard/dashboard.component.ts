import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServicesService } from '../services/api-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // username 
  user:String="";

  // to hold account to be deleted
  acno:any

  depositeForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]] ,
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })

  withdrawalForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]] ,
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })

  constructor(private fb:FormBuilder,
              private api:ApiServicesService,
              private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("uname")){
    this.user=localStorage.getItem("uname")|| ""
  }
  if(!localStorage.getItem("token"))
  {
    alert("please log in")
    // redirected to login page
    this.router.navigateByUrl("")

  }
}

  deposite()
  {
    var amount = this.depositeForm.value.amount
    var acno = this.depositeForm.value.acno
    var pswd = this.depositeForm.value.pswd

    if(this.depositeForm.valid){
    // asynchronous
    
      this.api.deposite(acno,pswd,amount)
      .subscribe((result:any)=>{
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

  // withdraw
  withdraw()
  {
    var amount = this.withdrawalForm.value.amount
    var acno = this.withdrawalForm.value.acno
    var pswd = this.withdrawalForm.value.pswd

    if(this.withdrawalForm.valid){
    // asynchronous
    
      this.api.withdraw(acno,pswd,amount)
      .subscribe((result:any)=>{
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
  // logout
  logout()
  {
    // remove existing user details from localstorage
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    localStorage.removeItem("currentAcno")

    // redirect to login
    this.router.navigateByUrl("")

  }

  // delete account -delete confirmation
  delete()
  {
    this.acno = localStorage.getItem("currentAcno")
  }

  // cancel() delete
  cancel()
  {
    this.acno=""
  }

  // onDelete
  ondelete(event:any)
  {
    // alert('from parent:  '+event)
    // make an call to service to delete the particular acno
    this.api.deleteAcc(event)
    .subscribe((result:any)=>{
      alert(result.message)
      this.logout()
    },
    result=>{
      alert(result.error.message)
    })
  }
}
