import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT;

// Database url
export const dbURL = process.env.DATABASE_URL;
// secret key
export const JWT_Secret = process.env.JWT_SECRET_KEY;



