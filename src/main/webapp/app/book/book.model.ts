export class BookDTO {

  constructor(data:Partial<BookDTO>) {
    Object.assign(this, data);
    if (data.genre) {
      this.genre = JSON.parse(data.genre);
    }
  }

  idBook?: number|null;
  title?: string|null;
  isbn?: string|null;
  genre?: any|null;
  author?: string|null;
  publicationYear?: string|null;
  condition?: string|null;
  price?: number|null;
  description?: string|null;
  coverImage?: string|null;
  quantity?: number|null;
  sellerId?: number|null;
  user?: number|null;

}
