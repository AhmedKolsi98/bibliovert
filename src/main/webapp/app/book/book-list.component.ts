import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { BookService } from 'app/book/book.service';
import { BookDTO } from 'app/book/book.model';


@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-list.component.html'})
export class BookListComponent implements OnInit, OnDestroy {

  bookService = inject(BookService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  books?: BookDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@book.delete.success:Book was removed successfully.`,
      'book.order.book.referenced': $localize`:@@book.order.book.referenced:This entity is still referenced by Order ${details?.id} via field Book.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.loadData();
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }
  
  loadData() {
    this.bookService.getAllBooks()
        .subscribe({
          next: (data) => this.books = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(idBook: number) {
    if (confirm(this.getMessage('confirm'))) {
      this.bookService.deleteBook(idBook)
          .subscribe({
            next: () => this.router.navigate(['/books'], {
              state: {
                msgInfo: this.getMessage('deleted')
              }
            }),
            error: (error) => {
              if (error.error?.code === 'REFERENCED') {
                const messageParts = error.error.message.split(',');
                this.router.navigate(['/books'], {
                  state: {
                    msgError: this.getMessage(messageParts[0], { id: messageParts[1] })
                  }
                });
                return;
              }
              this.errorHandler.handleServerError(error.error)
            }
          });
    }
  }

}
