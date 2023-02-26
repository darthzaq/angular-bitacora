import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemDialogPaymentComponent, ItemPaymentDialogResult } from '../item-dialog-payment/item-dialog-payment.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(private dialog: MatDialog, private store: AngularFirestore) { }

  ngOnInit(): void {
  }

  newItem(): void {
    const dialogRef = this.dialog.open(ItemDialogPaymentComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: ItemPaymentDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.store.collection('todo').add(result.itemPayment);
      });
  }
}
