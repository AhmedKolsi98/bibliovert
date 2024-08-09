export class OrderDTO {

  constructor(data:Partial<OrderDTO>) {
    Object.assign(this, data);
  }

  orderId?: number|null;
  userId?: number|null;
  orderDate?: string|null;
  book?: number|null;

}
