import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

export const drizzleDb = drizzle(connectionString, {
  schema: {
    users: 'usersTable',
  },
  logger: true,
});
