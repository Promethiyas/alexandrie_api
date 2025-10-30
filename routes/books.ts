import express from 'express';
import LibrairiesService from '../sql/books';

const router = express.Router();
type comicBook = {
  serie: string,
  tome: number
}
export type UserComicBooks = {
  comic_books: {
    [id: number]: comicBook;
  };
}
const librairiesService = new LibrairiesService();

// ajoute un livre dans la bdd
router.post('/register', async (req, res) => { 
  const book = await librairiesService.register(req.body.isbn_13,req.body.isbn_10,req.body.publishers,req.body.authors,req.body.title,req.body.number_of_pages,req.body.publish_date,req.body.covers);
  res.json(book);
});

// recup les infos du livres dans la bdd
router.get('/books/:isbn_13', async (req, res) => { 
  const isbn_13 = String(req.params.isbn_13)
  const book = await librairiesService.getBookByIsbn13(isbn_13);
  res.json(book);
});

// ajoute un livre dans la bibliothèque de l'utilisateur
router.post('/:id_user/:id_book', async (req, res) => { 
  const id: number = Number(req.params.id_user)
  const id_book: number = Number(req.params.id_book)
  const getBook = await librairiesService.getUserComicBooks(id) as UserComicBooks[];
  const newBook: comicBook = {
    serie: req.body.serie,
    tome: req.body.tome
  }
  const comicBooks: Record<number, { serie: string; tome: number }> = {}
  if (getBook.length > 0 && getBook[0].comic_books) {
    Object.assign(comicBooks, getBook[0].comic_books);
  }
  comicBooks[id_book] = {
    serie: req.body.serie,
    tome: req.body.tome
  };
  const addBook = await librairiesService.updateUserComicBooks(id, JSON.stringify(comicBooks));
  res.json(addBook)
});

// récupère la liste des livres de l'user
router.get('/:id_user/books', async (req,res) => {
  const id_user: number = Number(req.params.id_user)
  const book = await librairiesService.getUserComicBooks(id_user);
  res.json(book);
})

export default router;