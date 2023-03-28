import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../services/api-services.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  acno:Number=0

  transaction:any
  constructor(private api:ApiServicesService) { }

  ngOnInit(): void {
    if(localStorage.getItem("currentAcno"))
    {
      this.acno=Number(localStorage.getItem("currentAcno"))
      console.log(this.acno);
      
    }
    this.api.transaction(this.acno)
    .subscribe((result:any)=>{
      this.transaction=result.transaction
      console.log(this.transaction);
      
    })
  }

}
