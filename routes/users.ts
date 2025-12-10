import express from 'express';
import UsersService from '../sql/users';
import { InsertSql, Login } from '../type';

const router = express.Router();

const usersService = new UsersService();

type User = {
    id : number,
    last_name: string,
    first_name: string,
    email: string,
    phone_number: string,
    comic_books: JSON,
    reading_list: JSON,
};

router.get('/', async (req, res) => {
  const users:User | unknown = await usersService.getAll();
  res.json(users)
});

router.post('/register', async (req, res) => {
  const users: InsertSql = await usersService.register(req.body.last_name, req.body.first_name, req.body.email, req.body.phone_number,req.body.password);
  if (users && users.affectedRows === 1){
    res.status(200).json("Compte créé");
  }else{
    res.status(400).json("Erreur lors de la création du compte");
  }
});

router.post('/login', async (req, res) => {
  const users: Login = await usersService.login(req.body.email,req.body.phone_number,req.body.password);
  if (users && users[0] ){
    res.status(200).json(users)
  }else{
    res.status(400).json("Erreur lors de la connection")
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const users = await usersService.getUserById(id);
  res.json(users)
});
export default router;