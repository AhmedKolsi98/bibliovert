import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './book/book-list.component';
import { BookAddComponent } from './book/book-add.component';
import { BookEditComponent } from './book/book-edit.component';
import { UserListComponent } from './user/user-list.component';
import { UserAddComponent } from './user/user-add.component';
import { UserEditComponent } from './user/user-edit.component';
import { OrderListComponent } from './order/order-list.component';
import { OrderAddComponent } from './order/order-add.component';
import { OrderEditComponent } from './order/order-edit.component';
import { ErrorComponent } from './error/error.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: $localize`:@@home.index.headline:Welcome to your new app!`
  },
  {
    path: 'books',
    component: BookListComponent,
    title: $localize`:@@book.list.headline:Books`
  },
  {
    path: 'books/add',
    component: BookAddComponent,
    title: $localize`:@@book.add.headline:Add Book`
  },
  {
    path: 'books/edit/:idBook',
    component: BookEditComponent,
    title: $localize`:@@book.edit.headline:Edit Book`
  },
  {
    path: 'users',
    component: UserListComponent,
    title: $localize`:@@user.list.headline:Users`
  },
  {
    path: 'users/add',
    component: UserAddComponent,
    title: $localize`:@@user.add.headline:Add User`
  },
  {
    path: 'users/edit/:userId',
    component: UserEditComponent,
    title: $localize`:@@user.edit.headline:Edit User`
  },
  {
    path: 'orders',
    component: OrderListComponent,
    title: $localize`:@@order.list.headline:Orders`
  },
  {
    path: 'orders/add',
    component: OrderAddComponent,
    title: $localize`:@@order.add.headline:Add Order`
  },
  {
    path: 'orders/edit/:orderId',
    component: OrderEditComponent,
    title: $localize`:@@order.edit.headline:Edit Order`
  },
  {
    path: 'error',
    component: ErrorComponent,
    title: $localize`:@@error.headline:Error`
  },
  {
    path: '**',
    component: ErrorComponent,
    title: $localize`:@@notFound.headline:Page not found`
  }
];
