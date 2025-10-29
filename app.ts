import express from 'express';
import usersRouter from './routes/users';

const app = express();
app.use(express.json());

app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});