// SAFETY NET BEFORE MAIN APPLICATON: CATCHES ALL EXCEPTION
process.on('uncaughtException', ({ name, message, stack }: Error) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log('ERROR', { name, message, stack });

  process.exit(1);
});

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

import app from './app';
import { UserInterface } from './abstracts/interfaces';

declare global {
  namespace Express {
    interface Request {
      requestTime: string;
      user: UserInterface;
    }
  }
}

const port: number = 3000 || process.env.PORT;
const databasePassword: string | undefined = process.env.DATABASE_PASSWORD;
const databaseURI: string | undefined = process.env.DATABASE?.replace(
  '<PASSWORD>',
  databasePassword ?? ''
);

mongoose
  .connect(databaseURI ?? '')
  .then(() => console.log('DB connection Successful!'));

const server = app.listen(port, () =>
  console.log(`App running on port ${port}`)
);

// SERVER HAS AN UNHANDLED ERROR
process.on('unhandledRejection', ({ name, message, stack }: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log('ERROR', { name, message, stack });

  // SHUTTING DOWN GRACEFULLY
  server.close(() => process.exit(1));
});
