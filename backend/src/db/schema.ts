import { InferInsertModel } from 'drizzle-orm';
import { InferSelectModel } from 'drizzle-orm';
import { boolean } from 'drizzle-orm/pg-core';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  first_name: varchar({ length: 50 }).notNull(),
  last_name: varchar({ length: 50 }).notNull(),
  email: varchar({ length: 50 }).notNull().unique(),
  password: varchar({ length: 25 }).notNull(),
  cellphone: varchar({ length: 15 }).notNull(),
  tax_id: varchar({ length: 14 }).notNull(),
  is_paid: boolean().notNull().default(false),
  paid_until: varchar({ length: 30 }),
  pix_qr_code_id: varchar({ length: 100 }),
  created_at: varchar({ length: 30 }).notNull(),
  updated_at: varchar({ length: 30 }).notNull(),
});

export type UserSelectModel = InferSelectModel<typeof usersTable>;
export type UserInsertModel = InferInsertModel<typeof usersTable>;
