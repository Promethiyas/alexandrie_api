import connection from "../db";

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

    login(email: string, phone_number: string, password: string) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT id FROM users WHERE (email = ? OR phone_number = ?) AND AES_DECRYPT(user_password,"test") = ?', [email, phone_number, password],(error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        })
    }
    

    register(last_name: string, first_name: string ,email: string, phone_number: string, password: string) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users VALUES (0,?,?,?,?,"{}","{}",AES_ENCRYPT(?,"test"))', [last_name, first_name,email,phone_number, password], (error, results) => {
                if (error){
                    return reject(error);
                }
                resolve(results);
            })
        })
    }

    getUserById(id: number){
        return new Promise((resolve, reject) => {
            connection.query('SELECT id, last_name, first_name, email, phone_number, comic_books, reading_list FROM users WHERE id = ?', [id], (error, results) => {
                if (error){
                    return reject(error);
                }
                resolve(results);
            })
        })
    }
}
export default UsersService;
