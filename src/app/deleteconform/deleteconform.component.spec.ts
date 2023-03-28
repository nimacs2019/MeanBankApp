import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteconformComponent } from './deleteconform.component';

describe('DeleteconformComponent', () => {
  let component: DeleteconformComponent;
  let fixture: ComponentFixture<DeleteconformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteconformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteconformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
