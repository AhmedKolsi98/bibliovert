import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BookDTO } from 'app/book/book.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class BookService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/books';

  getAllBooks() {
    return this.http.get<BookDTO[]>(this.resourcePath);
  }

  getBook(idBook: number) {
    return this.http.get<BookDTO>(this.resourcePath + '/' + idBook);
  }

  createBook(bookDTO: BookDTO) {
    return this.http.post<number>(this.resourcePath, bookDTO);
  }

  updateBook(idBook: number, bookDTO: BookDTO) {
    return this.http.put<number>(this.resourcePath + '/' + idBook, bookDTO);
  }

  deleteBook(idBook: number) {
    return this.http.delete(this.resourcePath + '/' + idBook);
  }

  getUserValues() {
    return this.http.get<Record<string,number>>(this.resourcePath + '/userValues')
        .pipe(map(transformRecordToMap));
  }

}
