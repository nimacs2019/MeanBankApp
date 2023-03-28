import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-deleteconform',
  templateUrl: './deleteconform.component.html',
  styleUrls: ['./deleteconform.component.css']
})
export class DeleteconformComponent implements OnInit {
  
  @Input() item:undefined

  // event generated to Account Deletion-No
  @Output() onCancel = new EventEmitter()

  // event generated to Account Deletion-yes
  @Output() onDelete = new EventEmitter()
  
  constructor() { }

  ngOnInit(): void {
  }

  cancel()
  {
    this.onCancel.emit()
  }

  delete()
  {
    this.onDelete.emit(this.item)
  }

}
