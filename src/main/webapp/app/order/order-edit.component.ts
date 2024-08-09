import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { OrderService } from 'app/order/order.service';
import { OrderDTO } from 'app/order/order.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-order-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './order-edit.component.html'
})
export class OrderEditComponent implements OnInit {

  orderService = inject(OrderService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  bookValues?: Map<number,string>;
  currentOrderId?: number;

  editForm = new FormGroup({
    orderId: new FormControl({ value: null, disabled: true }),
    userId: new FormControl(null),
    orderDate: new FormControl(null),
    book: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@order.update.success:Order was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentOrderId = +this.route.snapshot.params['orderId'];
    this.orderService.getBookValues()
        .subscribe({
          next: (data) => this.bookValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.orderService.getOrder(this.currentOrderId!)
        .subscribe({
          next: (data) => updateForm(this.editForm, data),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.editForm.markAllAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    const data = new OrderDTO(this.editForm.value);
    this.orderService.updateOrder(this.currentOrderId!, data)
        .subscribe({
          next: () => this.router.navigate(['/orders'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
