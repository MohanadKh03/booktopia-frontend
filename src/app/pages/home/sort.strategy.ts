import { Book } from '../../core/models/book.interface';

export interface SortingStrategy {
  sort(books: Book[]): Book[];
}

export class ReviewSortingStrategy implements SortingStrategy {
  sort(books: Book[]): Book[] {
    return books.sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0));
  }
}

export class TitleSortingStrategy implements SortingStrategy {
  sort(books: Book[]): Book[] {
    return books.sort((a, b) => a.title.localeCompare(b.title));
  }
}

export class PriceLowToHighSortingStrategy implements SortingStrategy {
  sort(books: Book[]): Book[] {
    return books.sort((a, b) => a.price - b.price);
  }
}
export class PriceHighToLowSortingStrategy implements SortingStrategy {
  sort(books: Book[]): Book[] {
    return books.sort((a, b) => b.price - a.price);
  }
}
