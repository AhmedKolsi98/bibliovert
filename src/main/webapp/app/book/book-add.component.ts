import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { BookService } from 'app/book/book.service';
import { BookDTO } from 'app/book/book.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validDouble, validJson } from 'app/common/utils';


@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './book-add.component.html'
})
export class BookAddComponent implements OnInit {

  bookService = inject(BookService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  userValues?: Map<number,string>;

  addForm = new FormGroup({
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
      created: $localize`:@@book.create.success:Book was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.bookService.getUserValues()
        .subscribe({
          next: (data) => this.userValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new BookDTO(this.addForm.value);
    this.bookService.createBook(data)
        .subscribe({
          next: () => this.router.navigate(['/books'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
