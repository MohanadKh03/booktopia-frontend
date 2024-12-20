import { Book } from '../../core/models/book.interface';

export interface SortingStrategy {
  sort(books: Book[]): Book[];
}

// export class PopularitySortingStrategy implements SortingStrategy {
//   sort(books: Book[]): Book[] {
//     return books.sort((a, b) => b.popularity - a.popularity);
//   }
// }

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
