import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDialogPaymentComponent } from './item-dialog-payment.component';

describe('ItemDialogPaymentComponent', () => {
  let component: ItemDialogPaymentComponent;
  let fixture: ComponentFixture<ItemDialogPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDialogPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDialogPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
