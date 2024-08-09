import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { BookService } from 'app/book/book.service';
import { BookDTO } from 'app/book/book.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm, validDouble, validJson } from 'app/common/utils';


@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './book-edit.component.html'
})
export class BookEditComponent implements OnInit {

  bookService = inject(BookService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  userValues?: Map<number,string>;
  currentIdBook?: number;

  editForm = new FormGroup({
    idBook: new FormControl({ value: null, disabled: true }),
    title: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    isbn: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    genre: new FormControl(null, [validJson]),
    author: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    publicationYear: new FormControl(null, [Validators.maxLength(255)]),
    condition: new FormControl(null, [Validators.maxLength(255)]),
    price: new FormControl(null, [validDouble]),
    description: new FormControl(null, [Validators.maxLength(255)]),
    coverImage: new FormControl(null, [Validators.maxLength(255)]),
    quantity: new FormControl(null),
    sellerId: new FormControl(null),
    user: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@book.update.success:Book was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentIdBook = +this.route.snapshot.params['idBook'];
    this.bookService.getUserValues()
        .subscribe({
          next: (data) => this.userValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.bookService.getBook(this.currentIdBook!)
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
    const data = new BookDTO(this.editForm.value);
    this.bookService.updateBook(this.currentIdBook!, data)
        .subscribe({
          next: () => this.router.navigate(['/books'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
