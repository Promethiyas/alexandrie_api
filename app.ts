import express from 'express';
import usersRouter from './routes/users';
import booksRouter from './routes/books';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
app.use('/users', usersRouter);
app.use('/books', booksRouter);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});