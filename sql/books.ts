import connection from "../db";
import { UserComicBooks } from "../routes/books";

class LibrairiesService {

    register(isbn_13: string, isbn_10: string, publishers: string, authors: string, title: string, number_of_pages: number, publish_date: string, covers: Base64URLString) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO books VALUES (0,?,?,?,?,?,?,?,?)', [isbn_13,isbn_10,publishers,authors,title,number_of_pages,publish_date,covers], (error, results) => {
                if (error){
                    return reject(error);
                }
                resolve(results);
            })
        })
    }

    getBookByIsbn13(isbn_13: string){
        return new Promise((resolve, reject) => {
            connection.query('SELECT id, isbn_13,isbn_10,publishers,authors,title,number_of_pages,publish_date, covers FROM books WHERE isbn_13 = ?', [isbn_13], (error, results) => {
                if (error){
                    return reject(error);
                }
                resolve(results);
            })
        })
    }

    getUserComicBooks(idUser: number){ 
        return new Promise((resolve, reject) => {
            connection.query('SELECT comic_books FROM users WHERE id = ?', [idUser], (error, results) => {
                if (error){
                    return reject(error);
                }
                resolve(results);
            })
        })
    }

    updateUserComicBooks(idUser: number, comicBooks: string){
        return new Promise((resolve, reject) => {
            connection.query('UPDATE users SET comic_books = ? WHERE id = ?;', [comicBooks,idUser], (error, results) => {
                if (error){
                    return reject(error);
                }
                console.log(results)
                resolve(results);
            })
        })
    }

}
export default LibrairiesService;
