import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { OrderDTO } from 'app/order/order.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class OrderService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/orders';

  getAllOrders() {
    return this.http.get<OrderDTO[]>(this.resourcePath);
  }

  getOrder(orderId: number) {
    return this.http.get<OrderDTO>(this.resourcePath + '/' + orderId);
  }

  createOrder(orderDTO: OrderDTO) {
    return this.http.post<number>(this.resourcePath, orderDTO);
  }

  updateOrder(orderId: number, orderDTO: OrderDTO) {
    return this.http.put<number>(this.resourcePath + '/' + orderId, orderDTO);
  }

  deleteOrder(orderId: number) {
    return this.http.delete(this.resourcePath + '/' + orderId);
  }

  getBookValues() {
    return this.http.get<Record<string,string>>(this.resourcePath + '/bookValues')
        .pipe(map(transformRecordToMap));
  }

}
