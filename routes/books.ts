import express from 'express';
import LibrairiesService from '../sql/books';
import { Book, InsertSql } from '../type';
import { UUID } from 'crypto';

const router = express.Router();
type comicBook = {
  id: number,
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
  const book_google = await librairiesService.findBookOnline(req.body.isbn_13)
  const volume = book_google.items[0]?.volumeInfo
  const bookFromGoogle: Book = {
      title: volume?.title,
      isbn_13: volume?.industryIdentifiers[0]?.identifier,
      isbn_10: volume?.industryIdentifiers[1]?.identifier,
      number_of_pages: volume?.pageCount,
      authors: volume?.authors,
      publish_date: volume?.publishedDate,
      publishers: volume?.publisher,
      cover: volume?.imageLinks?.thumbnail
  }
  const insert: InsertSql = await librairiesService.register(bookFromGoogle);
  if (insert && insert?.affectedRows === 1){
      const book = await librairiesService.getBookById(insert.insertId.toString());
      res.status(200).json(book)
  }else{
    res.status(400).json("Erreur lors de l'ajout");
  }
});

// recup les infos du livres dans la bdd
router.get('/info/:id', async (req, res) => { 
  const id = String(req.params.id)
  const book: Book = await librairiesService.getBookById(id);
  if (book && book.title){
    res.status(200).json(book);
  }else{
    res.status(400).json("Le livre n'a pas été trouvé");
  }
});

// ajoute un livre dans la bibliothèque de l'utilisateur
router.post('/:id_user/:isbn_13', async (req, res) => { 
  const idUser: string = req.params.id_user
  const isbn_13: number = Number(req.params.isbn_13)
  const getBookId : Book = await librairiesService.getBookByIsbn13(isbn_13)
  let id_book: number | undefined
  if (getBookId && getBookId.id>0){
    id_book = getBookId.id
  }else{
    const book_google = await librairiesService.findBookOnline(isbn_13)
    const volume = book_google.items[0]?.volumeInfo
    const bookFromGoogle: Book = {
        title: volume?.title,
        isbn_13: volume?.industryIdentifiers[0]?.identifier,
        isbn_10: volume?.industryIdentifiers[1]?.identifier,
        number_of_pages: volume?.pageCount,
        authors: volume?.authors,
        publish_date: volume?.publishedDate,
        publishers: volume?.publisher,
        cover: volume?.imageLinks?.thumbnail
    }
    const insert: InsertSql = await librairiesService.register(bookFromGoogle);
    if (insert && insert?.affectedRows === 1){
      id_book = insert.insertId
    }else{
      res.status(400).json("Erreur lors de l'ajout");
    }
  }

  if (!id_book || id_book <= 0) {
    return res.status(400).json("Impossible de déterminer l'id du livre");
  }

  const getBook = await librairiesService.getUserComicBooks(idUser) as UserComicBooks[];
  const newBook: comicBook = {
    id: id_book,
    serie: req.body.serie,
    tome: req.body.tome
  }
  const comicBooks: Record<number, { id:number, serie: string; tome: number }> = {}
  if (getBook.length > 0 && getBook[0].comic_books) {
    Object.assign(comicBooks, getBook[0].comic_books);
  }
  if (comicBooks[id_book]) {
    return res.status(400).json({
      message: "Ce livre existe déjà dans la collection",
      book: comicBooks[id_book]
    });
  }
  comicBooks[id_book] = {
    id: id_book,
    serie: req.body.serie,
    tome: req.body.tome
  };
  const addBook: InsertSql = await librairiesService.updateUserComicBooks(idUser, JSON.stringify(comicBooks));
  if (addBook && addBook.affectedRows > 0){
    res.status(200).json("Livre ajouté")
  }else{
    res.status(400).json("Erreur dans l'ajout")
  }
});

// récupère la liste des livres de l'user
router.get('/:id_user', async (req,res) => {
  const id_user: string = req.params.id_user
  const books = await librairiesService.getUserComicBooks(id_user);
  res.json(books);
})

export default router;