import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemPayment } from '../item-payment/item-payment';

@Component({
  selector: 'app-item-dialog-payment',
  templateUrl: './item-dialog-payment.component.html',
  styleUrls: ['./item-dialog-payment.component.scss']
})
export class ItemDialogPaymentComponent {
  private backupTask: Partial<ItemPayment> = { ...this.data.itemPayment };

  constructor(
    public dialogRef: MatDialogRef<ItemDialogPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemPaymentDialogData
  ) {}

  cancel(): void {
    this.data.itemPayment.title = this.backupTask.title;
    this.data.itemPayment.description = this.backupTask.description;
    this.dialogRef.close(this.data);
  }
}

export interface ItemPaymentDialogData {
  itemPayment: Partial<ItemPayment>;
  enableDelete: boolean;
}

export interface ItemPaymentDialogResult {
  itemPayment: ItemPayment;
  delete?: boolean;
}
