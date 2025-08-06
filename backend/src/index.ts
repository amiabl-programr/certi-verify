import express from 'express'
import { connectToDatabase } from './config/db-config';
import authRoutes from './routes/auth-routes'
import userRoutes from './routes/user-routes';
connectToDatabase()
const app = express();
=======
import cors from 'cors';


connectToDatabase()
const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://certi-verify.vercel.app/'];


const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
     if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});