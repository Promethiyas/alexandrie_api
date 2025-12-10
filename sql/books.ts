import { UUID } from "crypto";
import connection from "../db";
import { Book, InsertSql } from "../type";
import { RowDataPacket } from "mysql2";

class LibrairiesService {

    register(book: Book): Promise<InsertSql> {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO books VALUES (0,?,?,?,?,?,?,?,?)', [book?.isbn_13,book?.isbn_10,book?.publishers,book?.authors,book?.title,book?.number_of_pages,book?.publish_date,book?.cover], (error, results) => {
                if (error){
                    return reject(error);
                }
                resolve(results as InsertSql);
            })
        })
    }

    getBookById(id: string): Promise<Book>{
        return new Promise((resolve, reject) => {
            connection.query('SELECT id, isbn_13,isbn_10,publishers,authors,title,number_of_pages,publish_date, covers FROM books WHERE id = ?', [id], (error, results) => {
                if (error){
                    return reject(error);
                }
                const rows = results as RowDataPacket[];
                if (rows.length === 0) {
                    return reject(new Error('Book not found'));
                }

                resolve(rows[0] as Book);
            })
        })
    }

    getBookByIsbn13(isbn_13: number): Promise<Book>{
        return new Promise((resolve, reject) => {
            connection.query('SELECT id, isbn_13,isbn_10,publishers,authors,title,number_of_pages,publish_date, covers FROM books WHERE isbn_13 = ?', [isbn_13], (error, results) => {
                if (error){
                    return reject(error);
                }
                const rows = results as RowDataPacket[];
                if (rows.length === 0) {
                    resolve(rows[0] as Book);
                }

                resolve(rows[0] as Book);
            })
        })
    }

    getUserComicBooks(idUser: string){ 
        return new Promise((resolve, reject) => {
            connection.query('SELECT comic_books FROM users WHERE id = UUID_TO_BIN(?)', [idUser], (error, results) => {
                if (error){
                    return reject(error);
                }
                resolve(results);
            })
        })
    }

    updateUserComicBooks(idUser: string, comicBooks: string): Promise<InsertSql>{
        return new Promise((resolve, reject) => {
            connection.query('UPDATE users SET comic_books = ? WHERE id = UUID_TO_BIN(?);', [comicBooks,idUser], (error, results) => {
                if (error){
                    return reject(error);
                }
                resolve(results as InsertSql);
            })
        })
    }

    async findBookOnline(isbn_13: number){
        const url: string = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn_13}&maxResults=1&printType=books&key=${process.env.API_KEY}`
        try {
            const response = await fetch(url, {
                method: "GET",
            });
            return response.json()
        } catch (error) {
            return "error"
        }
    }
}
export default LibrairiesService;
