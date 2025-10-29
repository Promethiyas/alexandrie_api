import express from 'express';
import UsersService from '../users';
import * as bcrypt from 'bcryptjs';

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
  const users = await usersService.register(req.body.last_name, req.body.first_name, req.body.email, req.body.phone_number,req.body.password);
  res.json(users);
});

router.post('/login', async (req, res) => {
  const users = await usersService.login(req.body.email,req.body.phone_number,req.body.password);
  res.json(users)
});

export default router;