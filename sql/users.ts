import connection from "../db";
import { InsertSql, Login } from "../type";

class UsersService {

    getAll() { 
        return new Promise((resolve, reject) => {
            connection.query('SELECT id, last_name, first_name, email, phone_number FROM users', (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    login(email: string, phone_number: string, password: string): Promise<Login> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT id FROM users WHERE (email = ? OR phone_number = ?) AND AES_DECRYPT(user_password,"test") = ?', [email, phone_number, password],(error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results as Login);
            });
        })
    }
    

    register(last_name: string, first_name: string ,email: string, phone_number: string, password: string): Promise<InsertSql> {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users (id, last_name, first_name, email, phone_number, comic_books, reading_list, user_password) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, "{}", "{}", AES_ENCRYPT(?,"test"))'
                , [last_name, first_name,email,phone_number, password], (error, results) => {
                if (error){
                    return reject(error);
                }
                resolve(results as InsertSql);
            })
        })
    }

    getUserById(id: number){
        return new Promise((resolve, reject) => {
            connection.query('SELECT id, last_name, first_name, email, phone_number, comic_books, reading_list FROM users WHERE id = UUID_TO_BIN(?)', [id], (error, results) => {
                if (error){
                    return reject(error);
                }
                resolve(results);
            })
        })
    }
}
export default UsersService;
